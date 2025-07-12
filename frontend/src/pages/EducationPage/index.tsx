import React from 'react';
import { NavLink } from 'react-router-dom';

const EducationPage: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-8 text-white">
      <h1 className="text-4xl font-bold mb-4">What is a CMS?</h1>
      <p className="text-lg mb-4">
        A Content Management System (CMS) is a software application that allows users to create, manage, and modify content on a website without the need for specialized technical knowledge.
      </p>
      <p className="text-lg mb-4">
        In simple terms, a CMS is a tool that helps you build a website without needing to write all the code from scratch (or even know how to code at all).
      </p>
      <h2 className="text-2xl font-bold mb-2">Key Features of a CMS</h2>
      <ul className="list-disc list-inside mb-4">
        <li className="text-lg">User-friendly interface for content creation and editing.</li>
        <li className="text-lg">Content repository for storing and managing web content, such as text, images, and videos.</li>
        <li className="text-lg">Workflow and collaboration tools for managing content creation and publishing processes.</li>
        <li className="text-lg">Templates and themes for controlling the look and feel of the website.</li>
        <li className="text-lg">Extensibility through plugins and modules for adding new features and functionality.</li>
      </ul>
      <h2 className="text-2xl font-bold mb-2">Why Use a CMS?</h2>
      <p className="text-lg">
        Using a CMS can save you time and money on website development and maintenance. It also empowers non-technical users to manage their own content, reducing the reliance on developers for day-to-day updates.
      </p>
      <div className="mt-8 flex justify-center gap-x-4">
        <NavLink to="/login" className="text-lg bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">
            Login
        </NavLink>
        <NavLink to="/register" className="text-lg bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded">
            Register
        </NavLink>
    </div>
    </div>
  );
};

export default EducationPage;
