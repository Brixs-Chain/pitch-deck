import React, { useState, useRef, useMemo } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useMutation } from 'convex/react';
import { api } from '../../convex/_generated/api';

export default function Admin() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [templateImage, setTemplateImage] = useState('');
  const [author, setAuthor] = useState('Brixs Team');
  const [seoTitle, setSeoTitle] = useState('');
  const [seoDescription, setSeoDescription] = useState('');
  const [isPublished, setIsPublished] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);
  
  const createPost = useMutation(api.posts.createPost);
  const generateUploadUrl = useMutation(api.posts.generateUploadUrl);
  const getImageUrl = useMutation(api.posts.getImageUrl);
  
  const quillRef = useRef<ReactQuill>(null);

  const uploadFile = async (file: File) => {
    const postUrl = await generateUploadUrl();
    const result = await fetch(postUrl, {
      method: "POST",
      headers: { "Content-Type": file.type },
      body: file,
    });
    const { storageId } = await result.json();
    return await getImageUrl({ storageId });
  };

  const handleTemplateImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      setUploadingImage(true);
      const url = await uploadFile(file);
      if (url) setTemplateImage(url);
    } catch (err) {
      console.error(err);
      alert('Failed to upload image');
    } finally {
      setUploadingImage(false);
    }
  };

  const imageHandler = () => {
    const input = document.createElement('input');
    input.setAttribute('type', 'file');
    input.setAttribute('accept', 'image/png, image/jpeg');
    input.click();

    input.onchange = async () => {
      const file = input.files?.[0];
      if (file) {
        try {
          const url = await uploadFile(file);
          const quill = quillRef.current?.getEditor();
          if (quill && url) {
            const range = quill.getSelection();
            quill.insertEmbed(range?.index || 0, 'image', url);
          }
        } catch (err) {
          console.error(err);
          alert('Failed to upload image into editor');
        }
      }
    };
  };

  const modules = useMemo(() => ({
    toolbar: {
      container: [
        [{ 'header': [1, 2, 3, false] }],
        ['bold', 'italic', 'underline', 'strike', 'blockquote'],
        [{'list': 'ordered'}, {'list': 'bullet'}, {'indent': '-1'}, {'indent': '+1'}],
        ['link', 'image', 'video'],
        [{ 'color': [] }, { 'background': [] }],
        ['clean']
      ],
      handlers: {
        image: imageHandler
      }
    }
  }), []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !content || !templateImage) {
      alert("Title, content, and template image are required!");
      return;
    }
    setIsSubmitting(true);
    try {
      await createPost({
        title,
        content,
        templateImage,
        author,
        seoTitle,
        seoDescription,
        isPublished,
      });
      alert('Post created successfully!');
      setTitle('');
      setContent('');
      setTemplateImage('');
      setSeoTitle('');
      setSeoDescription('');
    } catch (error) {
      console.error(error);
      alert('Error creating post');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div style={{ padding: '40px', maxWidth: '900px', margin: '0 auto', fontFamily: 'sans-serif', background: '#12141a', color: '#fff', minHeight: '100vh' }}>
      <h1 style={{ color: 'var(--accent, #00ffcc)', marginBottom: '30px' }}>Blog Admin Portal</h1>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
          <label>Title *</label>
          <input 
            type="text" 
            value={title} 
            onChange={e => setTitle(e.target.value)}
            style={{ padding: '10px', background: '#1a1e24', border: '1px solid #333', color: '#fff' }}
          />
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
          <label>Template Image (Cover Photo PNG/JPG) *</label>
          <input 
            type="file" 
            accept="image/png, image/jpeg"
            onChange={handleTemplateImageUpload}
            style={{ padding: '10px', background: '#1a1e24', border: '1px solid #333', color: '#fff' }}
          />
          {uploadingImage && <span style={{ color: '#00ffcc', fontSize: '12px' }}>Uploading...</span>}
          {templateImage && <img src={templateImage} alt="Preview" style={{ height: '150px', objectFit: 'cover', marginTop: '10px' }} />}
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
          <label>Author</label>
          <input 
            type="text" 
            value={author} 
            onChange={e => setAuthor(e.target.value)}
            style={{ padding: '10px', background: '#1a1e24', border: '1px solid #333', color: '#fff' }}
          />
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
          <label>Content *</label>
          <div style={{ background: '#fff', color: '#000', borderRadius: '4px', overflow: 'hidden' }}>
            <ReactQuill 
              ref={quillRef}
              theme="snow" 
              value={content} 
              onChange={setContent} 
              modules={modules}
              style={{ height: '400px', marginBottom: '50px' }}
            />
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '5px', marginTop: '20px' }}>
          <label>SEO Title</label>
          <input 
            type="text" 
            value={seoTitle} 
            onChange={e => setSeoTitle(e.target.value)}
            style={{ padding: '10px', background: '#1a1e24', border: '1px solid #333', color: '#fff' }}
          />
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
          <label>SEO Description</label>
          <textarea 
            value={seoDescription} 
            onChange={e => setSeoDescription(e.target.value)}
            style={{ padding: '10px', background: '#1a1e24', border: '1px solid #333', color: '#fff', minHeight: '80px' }}
          />
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <input 
            type="checkbox" 
            checked={isPublished}
            onChange={e => setIsPublished(e.target.checked)}
            id="isPublished"
          />
          <label htmlFor="isPublished">Publish immediately</label>
        </div>

        <button 
          type="submit" 
          disabled={isSubmitting || uploadingImage}
          style={{ padding: '15px 30px', background: 'var(--accent, #00ffcc)', color: '#000', fontWeight: 'bold', border: 'none', cursor: 'pointer', fontSize: '18px', marginTop: '20px', opacity: (isSubmitting || uploadingImage) ? 0.7 : 1 }}
        >
          {isSubmitting ? 'Publishing...' : 'Publish Blog Post'}
        </button>

      </form>
    </div>
  );
}
