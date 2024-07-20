import { useState } from "react";

const initialSections = [
  {
    id: 1234,
    title: "Profile",
    subtitle: "",
    description:
      "After long time working like a tattoo artist, I decided to change my carrier to web development",
  },
  {
    id: 3456,
    title: "Professional Experience",
    subtitle: "",
    description:
      "I have no experience in this field, apart from some projects I did with my mates on the LeWagon bootcamp",
  },
  {
    id: 7856,
    title: "Skills",
    subtitle: "",
    description: "Ruby on Rails, JavaScript, HTML, CSS, Git and Github",
  },
];

export default function App() {
  const [showAddSection, setShowAddSection] = useState(false);
  const [sections, setSections] = useState(initialSections);
  const [selected, setSelected] = useState(null);

  function handleShowAddSection() {
    setShowAddSection((show) => !show);
  }

  function handleAddNewSection(newSection) {
    setSections((sections) => [...sections, newSection]);
    setShowAddSection(false);
  }

  function handleSectionContent(subtitle, description) {
    setSections((sections) =>
      sections.map((section) =>
        section.id === selected?.id
          ? {
              ...section,
              subtitle: subtitle,
              description: description,
            }
          : section
      )
    );
  }

  function handleSelection(section) {
    // here could be like this ... setSelected(section), but the first state of the selected is null. So in this case it is necessary validate if the current section selected is null.
    setSelected((curSectionSelected) =>
      section.id === curSectionSelected?.id ? null : section
    );
  }

  return (
    <div className="app">
      <div className="sidebar">
        <SectionList
          sections={sections}
          selected={selected}
          onSelection={handleSelection}
        />

        {showAddSection && (
          <AddSectionForm onAddNewSection={handleAddNewSection} />
        )}

        <Button onShowAddSection={handleShowAddSection}>
          {showAddSection ? "Close" : "+ New section"}
        </Button>
      </div>
      <AddSectionContent onSectionContent={handleSectionContent} />
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

function SectionList({ sections, selected, onSelection }) {
  return (
    <ul>
      {sections.map((section) => (
        <Section
          section={section}
          key={section.id}
          selected={selected}
          onSelection={onSelection}
        />
      ))}
    </ul>
  );
}

function Section({ section, selected, onSelection }) {
  // it is necessary to know which section was selected by click;
  // the question mark after selected is necessary because the state is null in the beginning
  const isSelected = selected?.id === section.id;
  return (
    <li
      onClick={() => onSelection(section)}
      className={isSelected ? "selected" : ""}
    >
      <h3>{section.title}</h3>
      <h4>
        <strong>{section.subtitle}</strong>
      </h4>
      <p>{section.description}</p>
    </li>
  );
}

function AddSectionForm({ onAddNewSection }) {
  const [title, setTitle] = useState("");
  const id = Number(Date.now().toString().slice(-4));

  function handleSubmit(e) {
    e.preventDefault();
    if (!title) return;
    const newSection = {
      id: id,
      subtitle: "",
      description: "",
      title: title,
    };
    onAddNewSection(newSection);
  }

  return (
    <form className="add-section-form" onSubmit={handleSubmit}>
      <label>Section title:</label>
      <input type="text" onChange={(e) => setTitle(e.target.value)}></input>
      <Button>Add</Button>
    </form>
  );
}

function AddSectionContent({ onSectionContent }) {
  const [subtitle, setSubtitle] = useState("");
  const [description, setDescription] = useState("");

  function handleSubmit(e) {
    e.preventDefault();

    onSectionContent(subtitle, description);
    setSubtitle("");
    setDescription("");
  }

  return (
    <form className="add-content-form" onSubmit={handleSubmit}>
      <label>Subtitle field:</label>
      <input
        type="text"
        value={subtitle}
        onChange={(e) => setSubtitle(e.target.value)}
      ></input>
      <label>Description:</label>
      <input
        type="text"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      ></input>
      <div>
        <Button>Save</Button>
      </div>
    </form>
  );
}
