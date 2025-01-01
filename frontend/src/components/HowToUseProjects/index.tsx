type HowToUseProjectsProps = {};

const HowToUseProjects: React.FC<HowToUseProjectsProps> = () => {
    return (
        <div className="mt-4">
            <ol style={{ listStyleType: "number" }} className="ml-6 space-y-3 text-sm">
                <li>Click on "New Project" to create a project</li>
                <li>Give your project a name and description</li>
                <li>Add content types to your project (e.g., blog post, product)</li>
                <li>Create content entries based on your defined types</li>
                <li>Use the API or export feature to use your content in your applications</li>
            </ol>
        </div>
    );
};

export default HowToUseProjects;
