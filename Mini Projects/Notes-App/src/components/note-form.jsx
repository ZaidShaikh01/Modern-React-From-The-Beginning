import { useState } from 'react';
import TextInput from './inputs/textInput';
import SelectInput from './inputs/selectInput';
import TextAreaInput from './inputs/textareaInput';
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

  const [isFormVisible, setIsFormVisible] = useState(false);

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
    <>
      {/* Toggle-button */}
      <button
        onClick={() => {
          setIsFormVisible(!isFormVisible);
        }}
        className='w-full bg-gray-100 border border-gray-300 text-purple-800 py-2 rounded-lg cursor-pointer hover:bg-purple-200 hover:border-purple-300'
        transition
        mb-4
      >
        {isFormVisible ? 'Hide Form' : 'Add New Note ➕'}
      </button>

      {/* Form */}
      {isFormVisible && (
        <form onSubmit={handleSubmit} className='mb-6'>
          <TextInput
            label='Title'
            name='title'
            value={formData.title}
            onChange={handleChange}
            required
          />

          <SelectInput
            label='Priority'
            name='priority'
            value={formData.priority}
            onChange={handleChange}
            options={[
              { value: 'High', label: '🔴 High' },
              { value: 'Medium', label: '🟡 Medium' },
              { value: 'Low', label: '🟢 Low' },
            ]}
          />
          <SelectInput
            label='Category'
            name='category'
            value={formData.category}
            onChange={handleChange}
            options={[
              { value: 'Work', label: '📂 Work' },
              { value: 'Personal', label: '🏠 Personal' },
              { value: 'Ideas', label: '💡 Ideas' },
            ]}
          />

          <TextAreaInput
            label='Description'
            name='description'
            value={formData.description}
            onChange={handleChange}
            required
          />
          <button className='w-full bg-purple-500 text-white py-2 rounded-lg cursor-pointer hover: bg-purple-600'>
            Add Note
          </button>
        </form>
      )}
    </>
  );
};

export default NoteForm;
