import sounddevice as sd
import numpy as np
from pydub import AudioSegment
import csv
import os
import time
from datetime import datetime
from coughsneeze import audtext
import threading  # <-- Import the threading library

# --- Configuration ---
DURATION = 30         # Seconds to record
SAMPLE_RATE = 44100   # Audio sample rate
CHANNELS = 1          # Mono audio
CSV_FILE = 'transcriptions.csv'

# --- Thread-Safe CSV Writing ---
# We need a lock to prevent two threads from
# writing to the CSV file at the exact same time.
csv_lock = threading.Lock()

# --- Your Function (Placeholder) ---
# Replace this with your actual audiototext function.

# --- Helper Function to Write to CSV (Now Thread-Safe) ---
def append_to_csv(timestamp, transcription):
    """Appends a new row to the CSV file in a thread-safe way."""
    
    # Check if the file exists *before* acquiring the lock
    file_exists = os.path.isfile(CSV_FILE)
    
    # 'with' statement automatically acquires and releases the lock
    with csv_lock:
        with open(CSV_FILE, 'a', newline='', encoding='utf-8') as f:
            writer = csv.writer(f)
            # Write header only if file is new (check was done outside lock)
            if not file_exists:
                writer.writerow(['timestamp', 'transcription'])
            
            # Write the new data
            writer.writerow([timestamp, transcription])

# --- This function runs in its own thread ---
def process_audio_clip(audio_data, clip_timestamp):
    """
    This function handles saving, processing, and deleting a single clip.
    It is designed to be run in a separate thread.
    """
    temp_mp3 = None # Define variable for cleanup
    try:
        # 1. Generate a unique filename using the precise timestamp
        filename_str = clip_timestamp.strftime('%Y-%m-%d_%H-%M-%S_%f') # %f = microseconds
        temp_mp3 = f"audio_clip_{filename_str}.mp3"

        # 2. Convert NumPy array to MP3
        # print(f"[Processor] Saving {temp_mp3}...")
        audio_segment = AudioSegment(
            audio_data.tobytes(),
            frame_rate=SAMPLE_RATE,
            sample_width=audio_data.dtype.itemsize,  # 2 bytes for int16
            channels=CHANNELS
        )
        audio_segment.export(temp_mp3, format="mp3")
        
        # 3. Use your function (The slow part)
        transcription = audtext(temp_mp3)
        
        # 4. Store in CSV (using the thread-safe function)
        csv_timestamp = clip_timestamp.strftime('%Y-%m-%d %H:%M:%S')
        append_to_csv(csv_timestamp, transcription)
        print(f"[Processor] Saved to CSV: {csv_timestamp} - {transcription[:30]}...")

    except Exception as e:
        print(f"[Processor] ERROR processing {temp_mp3}: {e}")
    
    finally:
        # 5. Delete MP3 file (inside a finally block)
        # This ensures the file is deleted even if the transcription fails
        if temp_mp3 and os.path.exists(temp_mp3):
            os.remove(temp_mp3)
            # print(f"[Processor] Deleted {temp_mp3}.")

# --- Main Recording Loop (The "Producer") ---
def start_recording_pipeline():
    """
    Main loop to record audio and spawn processor threads.
    """
    print(f"Starting asynchronous recording pipeline. Press Ctrl+C to stop.")
    print(f"Each clip will be {DURATION} seconds long.")
    print(f"Model inference simulation is 12 seconds (slower than recording).")
    
    try:
        while True:
            # 1. Record Audio (This is the only blocking part in this loop)
            print(f"\n[Recorder] Recording for {DURATION} seconds...")
            recording = sd.rec(
                int(DURATION * SAMPLE_RATE), 
                samplerate=SAMPLE_RATE, 
                channels=CHANNELS, 
                dtype='int16'
            )
            # Get the exact time the recording *started* (roughly)
            record_start_time = datetime.now()
            
            sd.wait()  # Wait for the recording to complete
            print(f"[Recorder] Clip finished. Passing to processor thread.")

            # 2. Start a NEW thread to process this clip
            # We pass the raw audio data and the timestamp to the new thread
            processor_thread = threading.Thread(
                target=process_audio_clip,
                args=(recording.copy(), record_start_time)
            )
            processor_thread.daemon = True  # Allows the main program to exit
            processor_thread.start()
            
            # This loop now *immediately* restarts to record the next clip
            # without waiting for the `process_audio_clip` function to finish.

    except KeyboardInterrupt:
        print("\n[Recorder] Stopping the recording loop... (Processing threads may continue)")
    except Exception as e:
        print(f"\n[Recorder] An error occurred: {e}")

if __name__ == "__main__":
    start_recording_pipeline()