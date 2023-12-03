/* eslint-disable react/prop-types */
import React, { useState,useEffect } from "react";
import { TiEdit } from "react-icons/ti";
import { MdDeleteOutline } from "react-icons/md";
import Pagination from "./Pagination";
import { IoSearch } from "react-icons/io5";


function Table({ data }) {
  const itemsPerPage = 10;
  const [currentPage, setCurrentPage] = useState(1);
  const [searchInput, setSearchInput] = useState("");
  const [selectedItems, setSelectedItems] = useState([]);
  const [editableItems, setEditableItems] = useState({});
  const [filteredData, setFilteredData] = useState([]);


  // Calculate the total number of pages
  const totalPages = Math.ceil(data.length / itemsPerPage);

  useEffect(() => {
    const updatedFilteredData = data.filter((item) =>
      Object.values(item).some(
        (value) =>
          typeof value === "string" &&
          value.toLowerCase().includes(searchInput.toLowerCase())
      )
    );
    setFilteredData(updatedFilteredData);
    setCurrentPage(1); // Reset current page when search changes
  }, [data]);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = Math.min(startIndex + itemsPerPage, filteredData.length);
  const paginatedData = filteredData.slice(startIndex, endIndex);




 

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleCheckboxChange = (itemId) => {
    if (selectedItems.includes(itemId)) {
      setSelectedItems(selectedItems.filter((id) => id !== itemId));
    } else {
      setSelectedItems([...selectedItems, itemId]);
    }
  };

  const handleSelectAll = () => {
    const allPageIds = paginatedData.map((item) => item.id);
    const newSelectedItems =
      selectedItems.length === allPageIds.length ? [] : allPageIds;

    setSelectedItems(newSelectedItems);
  };
  const handleDeleteClick = (itemId) => {
    // Update the UI with the deleted item
    const updatedData = filteredData.filter((item) => item.id !== itemId);
    setFilteredData(updatedData);

  
  };

  const handleEditClick = (itemId) => {
    setEditableItems({ ...editableItems, [itemId]: true });
  };

  const handleInputChange = (itemId, e) => {
    const { name, value } = e.target;
    setEditableItems({
      ...editableItems,
      [itemId]: { ...editableItems[itemId], [name]: value },
    });
  };

  const handleSaveClick = (itemId) => {
    // Update the UI with the saved data
    const updatedData = filteredData.map((item) =>
      item.id === itemId
        ? { ...item, ...editableItems[itemId], id: itemId }
        : item
    );

    setFilteredData(updatedData);

    // Reset editable state for the item
    setEditableItems({ ...editableItems, [itemId]: false });
  };

  const handleBulkDelete = () => {
    if (selectedItems.length >= 10) {
      // Update the UI with the deleted items
      const updatedData = filteredData.filter(
        (item) => !selectedItems.includes(item.id)
      );
      setFilteredData(updatedData);
  
      // Reset selected items state
      setSelectedItems([]);
    }
  };
  const handleSearchClick = () => {
    const updatedFilteredData = data.filter((item) =>
      Object.values(item).some(
        (value) =>
          typeof value === "string" &&
          value.toLowerCase().includes(searchInput.toLowerCase())
      )
    );
    setFilteredData(updatedFilteredData);
    setCurrentPage(1); // Reset current page when search changes
   
  };

  const handleSearchKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSearchClick();
    }
  };



  return (
<div>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg mt-6">
        <div className="pb-4 bg-white dark:bg-gray-900 flex items-center justify-between">
          <div className="relative mt-1">
            <div className="absolute inset-y-0 rtl:inset-r-0 start-0 flex items-center ps-3 pointer-events-none ">
           

            </div>
            <input
              type="text"
              id="table-search"
              value={searchInput}
              onKeyPress={handleSearchKeyPress}
              onChange={(e) => setSearchInput(e.target.value)}
              className="block pt-3 pb-2 ps-12 ml-[2rem] mt-[-4] text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 "
              placeholder="Search for items"
            />

            
          </div>
          <div
                className="w-4 h-4 text-white mr-[67rem] cursor-pointer text-xl cursor-pointer hover:text-blue-500"
              >
                <IoSearch onClick={handleSearchClick} />
              </div>

          {
            selectedItems.length >= 10 ? (
              <div className="mr-[2rem] text-3xl cursor-pointer" onClick={handleBulkDelete}>
            <MdDeleteOutline color="red" />
          </div>
            ) : (
              <div className="mr-[2rem] text-3xl cursor-not-allowed" >
            <MdDeleteOutline  color="red" />
          </div>
            )

          }

        
        </div>
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 ">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="p-4">
                <div className="flex items-center">
                 
                  <input
                  id="checkbox-table-select-all"
                  type="checkbox"
                  checked={selectedItems.length === paginatedData.length}
                  onChange={handleSelectAll}
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                />
                <label htmlFor="checkbox-table-select-all" className="sr-only">
                  Select All
                </label>
                </div>
              </th>
              <th scope="col" className="px-6 py-3">
                Name
              </th>
              <th scope="col" className="px-6 py-3">
                Email
              </th>
              <th scope="col" className="px-6 py-3">
                Role
              </th>
              <th scope="col" className="px-6 py-3">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            { paginatedData .map((item) => (
              <tr
                key={item.id}
                className={`${
                  selectedItems.includes(item.id)
                    ? "bg-gray-200 dark:bg-gray-600" 
                    : "bg-white dark:bg-gray-800"
                } border-b hover:bg-gray-50 dark:hover:bg-gray-600`}
              >
                <td className="w-4 p-4">
                  <div className="flex items-center">
                    <input
                      id={`checkbox-table-search-${item.id}`}
                      type="checkbox"
                      checked={selectedItems.includes(item.id)}
                      onChange={() => handleCheckboxChange(item.id)}
                      className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                    />
                    <label
                      htmlFor={`checkbox-table-search-${item.id}`}
                      className="sr-only"
                    >
                      checkbox
                    </label>
                  </div>
                </td>
                <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                  {item.name}
                </td>
                <td className="px-6 py-4">{item.email}</td>
                <td className="px-6 py-4">{item.role}</td>
                <td className="px-6 py-4 flex text-xl">
              {editableItems[item.id] ? (
                <>
                  <input
                    type="text"
                    name="name" // Update with the field you want to edit
                    value={editableItems[item.id]?.name || item.name}
                    onChange={(e) => handleInputChange(item.id, e)}
                    className="px-2 py-1 border border-gray-300 rounded focus:ring-blue-500 focus:border-blue-500"
                  />
                  <button
                    onClick={() => handleSaveClick(item.id)}
                    className="px-2 py-1 ml-2 bg-blue-500 text-white rounded"
                  >
                    Save
                  </button>
                </>
              ) : (
                <div className="mr-2 text-xl cursor-pointer hover:text-green-500" onClick={() => handleEditClick(item.id)}>
                  <TiEdit />
                </div>
              )}
              <div className="cursor-pointer" onClick={() => handleDeleteClick(item.id)} >

              <MdDeleteOutline color="red" />
              </div>
            </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
        paginatedData={filteredData}
    

      />
    </div>
  );
}

export default Table;
