import { FaSearch, FaEdit } from "react-icons/fa";

const SnippetsPanel = () => {
  const dummyData = [
    "Touch Mahal",
    "Remedy Resource",
    "Geiler scheiß",
    "Touch Mahal",
    "Remedy Resource",
    "Geiler scheiß",
    "Touch Mahal",
    "Remedy Resource",
    "Geiler scheiß",
    "Touch Mahal",
    "Remedy Resource",
    "Geiler scheiß",
    "Touch Mahal",
    "Remedy Resource",
    "Geiler scheiß",
    "Touch Mahal",
    "Remedy Resource",
    "Geiler scheiß",
    "Touch Mahal",
    "Remedy Resource",
    "Geiler scheiß",
    "Touch Mahal",
    "Remedy Resource",
    "Geiler scheiß",
    "Touch Mahal",
    "Remedy Resource",
    "Geiler scheiß",
    "Touch Mahal",
    "Remedy Resource",
    "Geiler scheiß",
    "Touch Mahal",
    "Remedy Resource",
    "Geiler scheiß",
    "Touch Mahal",
    "Remedy Resource",
    "Geiler scheiß",
  ];

  return (
    <div className="h-full w-1/3 rounded-lg mr-4 overflow-auto">
      <div className="mb-2 bg-white rounded-lg h-16 w-full flex items-center justify-between p-6">
        <input type="text" placeholder="Search here" className="outline-none" />
        <FaSearch color="grey" className="hover:opacity-75 cursor-pointer" />
      </div>
      {dummyData.map((e) => (
        <div className="mb-2 bg-white rounded-lg h-16 w-full flex items-center justify-between p-6">
          <p>{e}</p>
          <FaEdit color="grey" className="hover:opacity-75 cursor-pointer" />
        </div>
      ))}
    </div>
  );
};

export default SnippetsPanel;
