import { useState } from 'react';
const NoteForm = ({ notes, setNotes }) => {
  //   const [title, setTitle] = useState('');
  //   const [priority, setPriority] = useState('Medium');
  //   const [category, setCategory] = useState('Work');
  //   const [description, setDescription] = useState('');

  const [formData, setFormData] = useState({
    title: '',
    category: 'Work',
    priority: 'Medium',
    description: '',
  });

  const handleChange = (e) => {
    setFormData({
      // We are spreading the data as it is in form
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form Submitted: ', formData);
    if (!formData.title || !formData.description) return;
    //Create note object
    const newNote = { id: Date.now(), ...formData };

    //Addnotes to state
    setNotes([newNote, ...notes]);

    //Reset Form Data
    setFormData({
      title: '',
      category: 'Work',
      priority: 'Medium',
      description: '',
    });
  };

  return (
    <form onSubmit={handleSubmit} className='mb-6'>
      <div className='mb-4'>
        <label htmlFor='title' className='block font-semibold'>
          Title
        </label>
        <input
          name='title'
          type='text'
          value={formData.title}
          onChange={handleChange}
          className='w-full p-2 border rounded-lg'
        />
      </div>
      <div className='mb-4'>
        <label htmlFor='priority' className='block font-semibold'>
          Priority
        </label>
        <select
          name='priority'
          type='text'
          value={formData.priority}
          onChange={handleChange}
          className='w-full p-2 border rounded-lg'
        >
          <option value='High'>🔴 High</option>
          <option value='Medium'>🟡 Medium</option>
          <option value='Low'>🟢 Low</option>
        </select>
      </div>
      <div className='mb-4'>
        <label htmlFor='category' className='block font-semibold'>
          Category
        </label>
        <select
          name='category'
          type='text'
          value={formData.category}
          onChange={handleChange}
          className='w-full p-2 border rounded-lg'
        >
          <option value='Work'>📂 Work</option>
          <option value='Personal'>🏠 Personal</option>
          <option value='Ideas'>💡 Ideas</option>
        </select>
      </div>

      <div className='mb-4'>
        <label htmlFor='description' className='block font-semibold'>
          Description
        </label>
        <textarea
          name='description'
          type='text'
          value={formData.description}
          onChange={handleChange}
          className='w-full p-2 border rounded-lg'
        ></textarea>
      </div>
      <button className='w-full bg-purple-500 text-white py-2 rounded-lg cursor-pointer hover: bg-purple-600'>
        Add Note
      </button>
    </form>
  );
};

export default NoteForm;
