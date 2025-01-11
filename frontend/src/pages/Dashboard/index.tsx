import { Link } from "react-router";
import PageHeader from "../../components/Common/PageHeader";
import HowToUseProjects from "../../components/HowToUseProjects";
// import RecentProjects from "../../components/RecentProjects";

const Dashboard = () => {
    return (
        <div className="h-screen w-full bg-gray-200 overflow-auto">
            <PageHeader header="Dashboard" />

            <div className="w-full p-6 space-y-6">
                <div className="rounded-2xl items-center border p-6 bg-white">
                    <h1 className="font-bold text-xl">What is a Content Management System?</h1>
                    <p className="text-xs opacity-50">Understanding the power of CMS</p>

                    <div className="mt-4">A Content Management System (CMS) is a software application that allows users to create, edit, collaborate on, publish and store digital content. CMSs are typically used for enterprise content management and web content management.</div>

                    <h2 className="font-bold mt-8 text-lg">Why Use a CMS?</h2>

                    <ul className="mt-4 ml-4 space-y-1 text-sm" style={{ listStyleType: "initial" }}>
                        <li>Easily manage and update content without technical knowledge</li>
                        <li>Collaborate with team members on content creation and editing</li>
                        <li>Maintain consistency across your digital platforms</li>
                        <li>Improve website performance with optimized content delivery</li>
                        <li>Scale your content strategy as your business grows</li>
                    </ul>
                </div>

                <div className="flex w-full gap-4 flex-wrap">
                    {/* <div className="rounded-2xl items-center border p-6 shrink basis-[calc(50%-16px)] bg-white">
                        <h2 className="font-bold text-xl">Recently Opened Projects</h2>
                        <p className="text-xs opacity-50">Quick access to your recent work</p>

                        <RecentProjects />
                    </div> */}

                    <div className="rounded-2xl items-center border p-6 w-full bg-white">
                        <Link to={'/projects'} className="float-right border rounded-xl px-6 py-2 border-slate-900">Open Projects</Link>
                        <h2 className="font-bold text-xl">How to Use Projects</h2>
                        <p className="text-xs opacity-50">Quick guide to get you started</p>


                        <HowToUseProjects />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
