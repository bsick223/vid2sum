import SchematicComponent from "@/components/schematic/SchematicComponent";

function ManagePlan() {
  return (
    <div className="container mx-auto p-4 md:p-0">
      <h1 className="text-3xl md:text-4xl font-bold mb-3 mt-4 bg-gradient-to-r from-gray-600 to-blue-400 inline-block text-transparent bg-clip-text">
        Manage Your Plan
      </h1>
      <p className="text-gray-600 mb-8">
        Manage your subscription and billing details here.
      </p>

      <SchematicComponent componentId="cmpn_h6scVDKY9Dm" />
      <footer className="mt-8 text-center text-sm text-gray-500">
        <p className="mb-2">Need help with your subscription? Contact our support team at <span className="text-blue-600">brendansick@gmail.com</span></p>
        <p>&copy; {new Date().getFullYear()} TrendFast. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default ManagePlan;
