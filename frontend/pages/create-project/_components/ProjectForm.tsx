import { createProject } from '@/api/project';
import Button from '@/components/Button';
import Input from '@/components/Input';
import { setSelectedProject } from '@/store/projectSlice';
import { useRouter } from 'next/navigation';
import React, { ChangeEvent, useState } from 'react'
import { useDispatch } from 'react-redux';

const ProjectForm = () => {

  const dispatch = useDispatch();
  const router = useRouter();

  const [projectDetails, setProjectDetails] = useState({
    name: '',
    description: ''
  });

  const [error, setError] = useState({
    isError: false,
    errMsg: ''
  });

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    
    setProjectDetails({
      ...projectDetails,
      [name]: value
    });
  };

  const handleSubmit = async () => {
    const responseObj = await createProject(projectDetails);

    if (responseObj?.isError) {
      setError({
        isError: true,
        errMsg: ''
      });
    } else {
      
      setProjectDetails({
        name: '',
        description: ''
      });      
      
      dispatch(setSelectedProject(responseObj.project));

      setTimeout(() => {
        router.push(`/project/${responseObj?.project?._id}`);
      }, 3000);
      
    }
  };

  return (
    <section className="mt-12 border shadow rounded-xl border-primary-blue w-2/3 mx-auto p-8 h-min">
      <div className="flex items-center justify-between border-b pb-4">
        <div className="text-2xl font-bold">Create New Project (LOL!!)</div>
      </div>

      <div className="mt-6 flex flex-col gap-2">
        <label className='opacity-75'>Project Name</label>
        <Input
          type='text'
          onChange={handleInputChange}
          classes = "w-2/3 border rounded shadow h-10 px-4"
          name={'name'}
        />

        <label className='mt-8 opacity-75'>Description</label>
        <textarea name={'description'} className='w-2/3 border rounded shadow h-24 p-4' onChange={handleInputChange}></textarea>
      </div>

      <Button text='Create New' onClick={handleSubmit} classes='mt-8 rounded-lg' />
    </section>
  )
}

export default ProjectForm;
