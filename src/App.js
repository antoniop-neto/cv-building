import { useState } from "react";

const sections = [
  {
    title: "Profile",
    subtitle: "",
    description:
      "After long time working like a tattoo artist, I decided to change my carrier to web development",
  },
  {
    title: "Professional Experience",
    subtitle: "",
    description:
      "I have no experience in this field, apart from some projects I did with my mates on the LeWagon bootcamp",
  },
  {
    title: "Skills",
    subtitle: "",
    description: "Ruby on Rails, JavaScript, HTML, CSS, Git and Github",
  },
];

export default function App() {
  const [showAddSection, setShowAddSection] = useState(false);

  function handleShowAddSection() {
    setShowAddSection((show) => !show);
  }

  return (
    <div className="app">
      <div className="sidebar">
        <SectionList />

        {showAddSection && <AddSectionForm />}

        <Button onShowAddSection={handleShowAddSection}>
          {showAddSection ? "Close" : "+ New section"}
        </Button>
      </div>
      <AddSectionContent />
    </div>
  );
}

function Button({ children, onShowAddSection }) {
  return (
    <button className="btn" onClick={onShowAddSection}>
      {children}
    </button>
  );
}

function SectionList() {
  return (
    <ul>
      {sections.map((section) => (
        <Section section={section} key={section.description} />
      ))}
    </ul>
  );
}

function Section({ section }) {
  return (
    <li>
      <h3>{section.title}</h3>
      <h4>
        <strong>{section.subtitle}</strong>
      </h4>
      <p>{section.description}</p>
    </li>
  );
}

function AddSectionForm() {
  return (
    <form className="add-section-form">
      <label>Section title:</label>
      <input type="text"></input>
      <Button>Add</Button>
    </form>
  );
}

function AddSectionContent() {
  return (
    <form className="add-content-form">
      <label>Subtitle field:</label>
      <input type="text"></input>
      <label>Description:</label>
      <input type="text"></input>
      <div>
        <Button>Save</Button>
      </div>
    </form>
  );
}
