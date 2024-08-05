import React from "react";

const ServiceKeyInfo = () => {
  return (
    <section className="mt-8 border shadow rounded-xl border-primary-blue w-2/3 mx-auto p-8 h-min">
      <div className="flex items-center justify-between border-b pb-4">
        <div className="text-2xl font-bold">Create Service Key</div>
      </div>

      <div className="mt-6">
        <ul className="list-disc pl-8 font-normal flex flex-col gap-2">
          <li>
            To create service key, Select your desired project of which you want
            to use in client project.
          </li>
          <li>
            Navigate to settings page where you manage API keys or service keys
          </li>
          <li>
            Create a new service key, providing necessary details like
            permissions
          </li>
          <li>
            Save the generated key securely, as it will be used by client
            project to access the services
          </li>
        </ul>
      </div>

      <div className="flex items-center justify-between border-b pb-4 pt-8">
        <div className="text-2xl font-bold">
          Integrate Service Key in Client Project
        </div>
      </div>

      <div className="mt-6">
        <ul className="list-disc pl-8 font-normal flex flex-col gap-2">
          <li>
            To create service key, Select your desired project of which you want
            to use in client project.
          </li>
          <li>
            Navigate to settings page where you manage API keys or service keys
          </li>
          <li>
            Create a new service key, providing necessary details like
            permissions
          </li>
          <li>
            Save the generated key securely, as it will be used by client
            project to access the services
          </li>
        </ul>
      </div>
    </section>
  );
};

export default ServiceKeyInfo;
