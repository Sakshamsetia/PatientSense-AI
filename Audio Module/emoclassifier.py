import torch
import torchaudio
from transformers import AutoFeatureExtractor, AutoModelForAudioClassification

extractor = AutoFeatureExtractor.from_pretrained("ehcalabres/wav2vec2-lg-xlsr-en-speech-emotion-recognition")
model = AutoModelForAudioClassification.from_pretrained("ehcalabres/wav2vec2-lg-xlsr-en-speech-emotion-recognition")

# Load an audio file (16kHz mono)
# speech, sr = torchaudio.load("test.wav")
# if sr != 16000:
#     resampler = torchaudio.transforms.Resample(sr, 16000)
#     speech = resampler(speech)

# inputs = extractor(speech.squeeze(), sampling_rate=16000, return_tensors="pt")
# with torch.no_grad():
#     logits = model(**inputs).logits

# predicted_id = torch.argmax(logits, dim=-1).item()
# labels = model.config.id2label
# print(f"Predicted emotion: {labels[predicted_id]}")
