
function BoardList() {
  // Array of Bangladesh  board names
  const boards = [
    "Barisal Board",
    "Chittagong Board",
    "Comilla Board",
    "Dhaka Board",
    "Dinajpur Board",
    "Jessore Board",
    "Mymensingh Board",
    "Rajshahi Board",
    "Sylhet Board",
    "Madrasah Board",
    "Technical Board",
  ];

  return (
    <>
      {boards.map((board, index) => (
        <option key={index} value={board}>{board}</option>
      ))}
    </>
  );
}

export default BoardList;
