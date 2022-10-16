import { Cancel, InsertPhoto } from "@mui/icons-material";
import { useRef, useState } from "react";
import { uploadImage, addPet } from "../../utils/api";
import { useHistory } from "react-router-dom";
import "./addPet.css";

export default function Pets({ currentUser }) {
  const name = useRef();
  const animal = useRef();
  const birthday = useRef();
  const [file, setFile] = useState("");
  const [error, setError] = useState(false);
  const history = useHistory();

  const handleSubmit = (event) => {
    event.preventDefault();
    if (currentUser.username !== "guest-user") {
      const newPet = {
        username: currentUser.username,
        name: name.current.value,
        birthday: birthday.current.value,
        animal: animal.current.value,
      };
      // if the new posts includes a file when submitting
      const data = new FormData();
      data.append("name", file.name);
      data.append("file", file);
      newPet.img = file.location;
      try {
        uploadImage(data)
          .then((response) => {
            newPet.img = response.data;
          })
          .then(() => addPet(newPet).then(history.go()));
      } catch (error) {
        console.log(error);
      }
    } else {
      setError(true);
    }
  };

  return (
    <>
      <a href="#demo-modal" className="addPetButton">
        Add new pet
      </a>
      <div id="demo-modal" class="addPetModal">
        <div class="addPetModalContent">
          {file ? (
            <div className="addPetPhotoContainer">
              <img
                src={URL.createObjectURL(file)}
                alt=""
                className="addPetPhoto"
              />
              <Cancel className="shareDiscard" onClick={() => setFile(null)} />
            </div>
          ) : null}
          <form className="addPetBox" onSubmit={handleSubmit} required>
            <label
              htmlFor="file"
              className="addPetInput"
              style={{ cursor: "pointer" }}
            >
              <div className="addPetBoxPhotoButton">
                <InsertPhoto style={{ marginRight: "10px" }} /> Add pet photo
              </div>
              <input
                style={{ display: "none" }}
                type="file"
                id="file"
                accept=".png,.jpg,.jpeg"
                onChange={(event) => setFile(event.target.files[0])}
                required
              ></input>
            </label>
            <input
              type="text"
              className="addPetInput"
              placeholder="Name"
              ref={name}
              required
              minLength="3"
            />
            <select
              ref={animal}
              className="addPetInput"
              name="animals"
              required
            >
              <option value="">Select animal type</option>
              <option value="cat">Cat</option>
              <option value="dog">Dog</option>
              <option value="bird">Bird</option>
              <option value="reptile">Reptile</option>
              <option value="rabbit">Rabbit</option>
              <option value="horse">Horse</option>
              <option value="fish">Fish</option>
              <option value="rat">Rat/Mouse</option>
              <option value="amphibian">Amphibian</option>
              <option value="insect">Insect</option>
              <option value="other">Other</option>
            </select>
            <input
              type="text"
              className="addPetInput"
              placeholder="Birthday"
              ref={birthday}
              required
              minLength="6"
              autocomplete="on"
            />
            <button className="addPetFormButton" type="submit">
              Add pet
            </button>
          </form>

          <a href="#" class="addPetModalClose">
            &times;
          </a>
        </div>
      </div>
    </>
  );
}
