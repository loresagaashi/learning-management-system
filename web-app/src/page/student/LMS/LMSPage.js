// import { useState } from "react";
// import BreadcrumbNav from "./components/BreadcrumbNav";
// import CoursesSelect from "./components/CoursesSelect";
// import DegreeLevelSelect from "./components/DegreeLevelSelect";
// import GenerationSelect from "./components/GenerationSelect";
// import LectureSelect from "./components/LectureSelect";
// import SemesterSelect from "./components/SemesterSelect";

// const LMSPage = () => {
//   const [step, setStep] = useState(1);

//   const [selectedCategory, setSelectedCategory] = useState("");
//   const [selectedDegreeLevel, setSelectedDegreeLevel] = useState("");
//   const [selectedGeneration, setSelectedGeneration] = useState("");
//   const [selectedSemester, setSelectedSemester] = useState("");
//   const [selectedCourses, setSelectedCourses] = useState([]);

//   const categories = ["Technologies", "Economy"];
//   const degreeLevels = ["Bachelor", "Master"];
//   const generations = ["2020/21", "2021/22", "2022/23"];
//   const semesters = ["Semester 1", "Semester 2"];
//   const courses = [
//     "Mathematics 1",
//     "Computer Science Basics",
//     "Algorithms and Data Structures",
//   ];

//   const handleNext = () => setStep((prev) => Math.min(prev + 1, 5));
//   const handleBack = () => setStep((prev) => Math.max(prev - 1, 1));

//   const renderContent = () => {
//     switch (step) {
//       case 1:
//         return (
//           <LectureSelect
//             value={selectedCategory}
//             onChange={setSelectedCategory}
//             options={categories}
//           />
//         );
//       case 2:
//         return (
//           <DegreeLevelSelect
//             value={selectedDegreeLevel}
//             onChange={setSelectedDegreeLevel}
//             options={degreeLevels}
//           />
//         );
//       case 3:
//         return (
//           <GenerationSelect
//             value={selectedGeneration}
//             onChange={setSelectedGeneration}
//             options={generations}
//           />
//         );
//       case 4:
//         return (
//           <SemesterSelect
//             value={selectedSemester}
//             onChange={setSelectedSemester}
//             options={semesters}
//           />
//         );
//       case 5:
//         return (
//           <CoursesSelect
//             value={selectedCourses}
//             onChange={setSelectedCourses}
//             options={courses}
//           />
//         );
//       default:
//         return <div>All steps completed!</div>;
//     }
//   };

//   return (
//     <div className="max-w-md mx-auto mt-10 p-6 border rounded shadow">
//       <BreadcrumbNav step={step} />
//       <div className="my-6">{renderContent()}</div>
//       <div className="flex justify-between mt-6">
//         <button
//           onClick={handleBack}
//           disabled={step === 1}
//           className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50"
//         >
//           Back
//         </button>
//         <button
//           onClick={handleNext}
//           disabled={step === 5}
//           className="px-4 py-2 bg-blue-500 text-white rounded"
//         >
//           Next
//         </button>
//       </div>
//     </div>
//   );
// };

// export default LMSPage;
