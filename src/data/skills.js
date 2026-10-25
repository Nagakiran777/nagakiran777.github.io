// Skill groups. "projects" = ids from projects.js where the skill is evidenced in code. No ratings on purpose.
export default [
  { group: 'Computer vision', blurb: 'Image classification and medical-image experiments.', items: [
    { name: 'CNNs / Vision Transformers', projects: ['musculoskeletal-classification'] },
    { name: 'Image preprocessing', projects: ['musculoskeletal-classification'] },
    { name: 'OpenCV (Canny, Hough)', projects: ['road-lane-detection'] },
    { name: 'CNN image classification', projects: ['plant-leaf-disease'] } ] },
  { group: 'AI and machine learning', blurb: 'Training and evaluating models.', items: [
    { name: 'Deep learning', projects: ['musculoskeletal-classification'] },
    { name: 'Model evaluation (AUC, F1)', projects: ['musculoskeletal-classification'] },
    { name: 'Class balancing (SMOTE)', projects: ['musculoskeletal-classification'] },
    { name: 'Chatbots (ChatterBot)', projects: ['digital-bheem-chatbot'] },
    { name: 'Data analysis (pandas)', projects: ['heat-wave-alert'] } ] },
  { group: 'Speech and audio AI', blurb: 'Pipelines that process spoken audio.', items: [
    { name: 'Speech recognition (Whisper)', projects: ['ai-dub-studio'] },
    { name: 'Speaker diarization', projects: ['ai-dub-studio'] },
    { name: 'Text-to-speech (XTTS-v2)', projects: ['ai-dub-studio'] },
    { name: 'Emotion recognition from audio', projects: ['ai-dub-studio'] } ] },
  { group: 'Programming and apps', blurb: 'Languages and application development.', items: [
    { name: 'Python', projects: ['ai-dub-studio','musculoskeletal-classification','anime-auto-uploader'] },
    { name: 'JavaScript / React', projects: [] }, { name: 'HTML / CSS', projects: [] },
    { name: 'C# / ASP.NET Core MVC', projects: ['csharp-shopping-mvc'] }, { name: 'SQL', projects: [] } ] },
  { group: 'Tools and frameworks', blurb: 'Libraries used in the repositories.', items: [
    { name: 'TensorFlow / Keras', projects: ['musculoskeletal-classification'] },
    { name: 'PyTorch', projects: ['ai-dub-studio'] },
    { name: 'Streamlit', projects: ['musculoskeletal-classification'] },
    { name: 'PyQt6', projects: ['ai-dub-studio'] },
    { name: 'Git / GitHub Actions', projects: ['anime-auto-uploader'] } ] },
]
