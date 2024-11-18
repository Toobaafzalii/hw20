export default function CardSkeleton() {
  return (
    <div className="bg-gray-100 flex flex-col justify-between items-start p-4 gap-6 shadow-xl rounded-xl">
      <div className="w-full flex justify-between items-center px-1 animate-pulse">
        <div className="bg-gray-300 py-2.5 px-20 rounded-md"></div>
        <div className="bg-gray-300 p-2.5 rounded-md"></div>
      </div>
      <div className="bg-gray-300 py-1.5 px-28 rounded-md mx-1 animate-pulse"></div>
      <div className="w-full flex flex-col md:flex-row justify-between items-center gap-2 animate-pulse">
        <div className="bg-gray-300 w-full py-[17px] px-2 font-medium rounded-md shadow-md"></div>
        <div className="bg-gray-300 w-full py-[17px] px-2 rounded-md font-medium shadow-md"></div>
      </div>
    </div>
  );
}
