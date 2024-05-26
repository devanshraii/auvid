import { useState } from 'react';
import { Container, Group, Button, FileInput, Text, Loader } from '@mantine/core';

export default function Home() {
  const [audioFile, setAudioFile] = useState(null);
  const [videoFile, setVideoFile] = useState(null);
  const [outputUrl, setOutputUrl] = useState('');
  const [loading, setLoading] = useState(false);

  const handleCombine = () => {
    if (audioFile && videoFile) {
      setLoading(true);
      const video = document.createElement('video');
      video.src = URL.createObjectURL(videoFile);

      video.onloadedmetadata = () => {
        const audio = document.createElement('audio');
        audio.src = URL.createObjectURL(audioFile);

        audio.onloadedmetadata = () => {
          const canvas = document.createElement('canvas');
          const ctx = canvas.getContext('2d');

          canvas.width = video.videoWidth;
          canvas.height = video.videoHeight;

          const stream = canvas.captureStream();
          const audioContext = new AudioContext();
          const destination = audioContext.createMediaStreamDestination();
          const source = audioContext.createMediaElementSource(audio);

          source.connect(destination);
          stream.addTrack(destination.stream.getAudioTracks()[0]);

          const recorder = new MediaRecorder(stream);
          const chunks = [];

          recorder.ondataavailable = (e) => chunks.push(e.data);
          recorder.onstop = () => {
            const blob = new Blob(chunks, { type: 'video/webm' });
            const url = URL.createObjectURL(blob);
            setOutputUrl(url);
            setLoading(false);
          };

          video.play();
          audio.play();
          recorder.start();

          video.onended = () => {
            audio.pause();
            recorder.stop();
          };

          audio.onended = () => {
            video.pause();
            recorder.stop();
          };
        };
      };
    }
  };

  return (
    <Container>
      <Group direction="column" spacing="xl">
        <FileInput
          placeholder="Upload video"
          label="Video File"
          accept="video/*"
          onChange={setVideoFile}
        />
        <FileInput
          placeholder="Upload audio"
          label="Audio File"
          accept="audio/*"
          onChange={setAudioFile}
        />
        <Button onClick={handleCombine} disabled={loading}>
          {loading ? <Loader size="sm" /> : 'Combine Audio and Video'}
        </Button>
        {outputUrl && (
          <video controls src={outputUrl} style={{ marginTop: '20px' }} />
        )}
      </Group>
    </Container>
  );
}
