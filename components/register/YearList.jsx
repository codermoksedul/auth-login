
function YearList() {
  const currentYear = new Date().getFullYear();
  const endYear = currentYear + 5; // Calculate the end year

  const years = Array.from({ length: endYear - 1999 }, (_, index) => 2000 + index);

  return (
    <>
      {years.map((year) => (
        <option key={year} value={year}>{year}</option>
      ))}
    </>
  );
}

export default YearList;
