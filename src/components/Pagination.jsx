import React from 'react';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/20/solid';

const itemsPerPage = 10;

function Pagination({ currentPage, onPageChange, paginatedData }) {
  const totalItems = paginatedData.length;
  const totalPages = Math.max(1, Math.ceil(totalItems / itemsPerPage));

  const generatePageNumbers = () => {
    const pageNumbers = [];
    const maxVisiblePages = 5;

    const startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    const endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(i);
    }

    return pageNumbers;
  };

  const showResultsStart = (currentPage - 1) * itemsPerPage + 1;
  const showResultsEnd = Math.min(currentPage * itemsPerPage, totalItems);

  return (
    <>
      <div className="flex items-center justify-between border-t border-gray-200 bg-dark px-4 py-3 sm:px-6">
        <div className="flex flex-1 justify-between sm:hidden">
          <a
            href="#"
            onClick={() => onPageChange(Math.max(1, currentPage - 1))}
            className={`relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-white ${
              currentPage === 1 ? 'pointer-events-none' : 'hover:bg-gray-500'
            }`}
          >
            Previous
          </a>
          <a
            href="#"
            onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
            className={`relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-white ${
              currentPage === totalPages ? 'pointer-events-none' : 'hover:bg-gray-500'
            }`}
          >
            Next
          </a>
        </div>
        <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
          <div>
            <p className="text-sm text-white">
              Showing <span className="font-medium">{showResultsStart}</span> to{' '}
              <span className="font-medium">{showResultsEnd}</span> of{' '}
              <span className="font-medium">{totalItems}</span> results
            </p>
          </div>
          <div>
            <nav className="isolate inline-flex -space-x-px rounded-md shadow-sm" aria-label="Pagination">
              <a
                href="#"
                onClick={() => onPageChange(Math.max(1, currentPage - 1))}
                className={`relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 ${
                  currentPage === 1 ? 'pointer-events-none' : 'hover:bg-gray-500'
                }`}
              >
                <span className="sr-only">Previous</span>
                <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
              </a>
              {generatePageNumbers().map((pageNumber) => (
                <a
                  key={pageNumber}
                  onClick={() => onPageChange(pageNumber)}
                  className={`relative inline-flex items-center ${
                    pageNumber === currentPage
                      ? 'z-10 bg-indigo-600 text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'
                      : 'text-gray-200 hover:bg-gray-500'
                  } px-4 py-2 text-sm font-semibold ring-1 ring-inset ring-gray-300 focus:outline-offset-0`}
                >
                  {pageNumber}
                </a>
              ))}
              <a
                href="#"
                onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
                className={`relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 ${
                  currentPage === totalPages ? 'pointer-events-none' : 'hover:bg-gray-500'
                }`}
              >
                <span className="sr-only">Next</span>
                <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
              </a>
            </nav>
          </div>
        </div>
      </div>
    </>
  );
}

export default Pagination;
