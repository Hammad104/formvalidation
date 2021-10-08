import React, { useState, useRef } from "react";
import Style from "./form.module.css";
import formData from "./formData";
function App() {
  const [file, setFile] = useState();
  const [formState, setFormState] = useState({
    fname: "",
    lname: "",
    cnic: "",
    cnicIssue: "",
    mobile: "",
    email: "",
    qualification: "",
    dob: "",
    password: "",
    confirmpassword: "",
    provinceorstate: "",
    games: "",
    relegion: "",
  });
  let passwordRef = useRef(null);
  let mobileRef = useRef(null);
  const [choice, setChoice] = useState(false);
  const [errorState, setErrorState] = useState({
    fname: "this filed is required !",
    lname: " this filed is required ! ",
    cnic: { status: false, message: "this filed is required !" },
    cnicIssue: "this filed is required !",
    mobile: { status: false, message: "this filed is required !" },
    email: { status: false, message: " this filed is required ! " },
    qualification: "this filed is required !",
    dob: "this filed is required !",
    password: { status: false, message: "this filed is required !" },
    provinceorstate: "Please select province or state",
    games: "Please select game",
    relegion: "Please select relegion",
  });
  const religion = [
    "Islam",
    "Christianity",
    "Hinduism",
    "Buddhism",
    "Sikhism",
    "Athiest",
    "Other",
  ];

  const fileSelectedHandler = (event) => {
    console.log(URL.createObjectURL(event.target.files[0]));
    setFile(URL.createObjectURL(event.target.files[0]));
  };

  const handleChange = (event) => {
    const value = event.target.value;

    //For Password
    if (event.target.name === "password") {
      settingState(event, value);
      settingErrors(event, passwordValidation(value));
    }

    //for confirm Password
    else if (event.target.name === "confirmpassword") {
      if (formState.password === "") {
        passwordRef.current.focus();
      } else if (errorState.password.status === false) {
        passwordRef.current.focus();
        alert("password not valid");
      } else {
        settingState(event, value);
      }
    }

    //For email
    else if (event.target.name === "email") {
      if (errorState.mobile.status === false) {
        mobileRef.current.focus();
        alert("Enter mobile number again");
      } else {
        settingState(event, value);
        settingErrors(event, emailValidation(value));
      }
    }

    //For CNIC Check
    else if (event.target.name === "cnic") {
      settingState(event, value);
      settingErrors(event, cnicValidation(value));
    }

    //For Mobile Check
    else if (event.target.name === "mobile") {
      settingState(event, value);
      settingErrors(event, mobileValidation(value));
    } else {
      settingState(event, value);
    }
  };

  // Setting FormStates
  const settingState = (event, value) => {
    setFormState({
      ...formState,
      [event.target.name]: value,
    });
  };

  //Setting FormState Errors
  const settingErrors = (event, statusTemp) => {
    const name = event.target.name;
    setErrorState({
      ...errorState,
      [name]: {
        status: statusTemp,
      },
    });
  };

  // Fields Validations
  const passwordValidation = (value) => {
    if (/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/.test(value))
      return true;
    else return false;
  };
  const mobileValidation = (value) => {
    if (/^[03]{1}[0-9]{3}-[0-9]{7}$/.test(value)) return true;
    else return false;
  };
  const emailValidation = (value) => {
    if (/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value)) return true;
    else return false;
  };
  const cnicValidation = (value) => {
    if (/^[3]{1}[0-4]{4}-[0-9]{7}-[0-9]{1}$/.test(value)) return true;
    else return false;
  };

  //On Form Submit
  const formSubmitted = (e) => {
    e.preventDefault();
    let forAlert = false;
    if (formState.password !== formState.confirmpassword) {
      alert("Password not matched");
    }
    for (let obj in formState) {
      if (formState[obj] === "") {
        forAlert = true;
      }
    }
    if (forAlert === true) {
      alert("Fill the form first");
    } else {
      console.log(formState);
    }
    setChoice(true);
  };
  return (
    <div className={Style.wrapper}>
      <form className={Style.form}>
        <div className={Style.main_div}>
          <div className={Style.child_div}>
            <label htmlFor="fname">First Name</label> <br />
            <input
              placeholder="Enter Your Fist Name"
              type="text"
              name="fname"
              value={formState.fname}
              onChange={handleChange}
            />
            <span
              style={
                formState.fname === "" && choice === true
                  ? { display: "block", marginTop: "10px", color: "red" }
                  : { display: "none" }
              }
            >
              {errorState.fname}
            </span>
            <br />
            <br />
            <label htmlFor="lname">Last Name</label> <br />
            <input
              placeholder="Enter Your Last Name"
              type="text"
              name="lname"
              value={formState.lname}
              onChange={handleChange}
            />
            <span
              style={
                formState.lname === "" && choice === true
                  ? { display: "block", marginTop: "10px", color: "red" }
                  : { display: "none" }
              }
            >
              {errorState.lname}
            </span>
            <br />
            <br />
            <label htmlFor="cnic">CNIC</label> <br />
            <input
              placeholder="xxxxx-xxxxxxx-x"
              type="cnic-number"
              name="cnic"
              value={formState.cnic}
              onChange={handleChange}
            />
            <span
              style={
                formState.cnic === "" && choice === true
                  ? { display: "block", marginTop: "10px", color: "red" }
                  : { display: "none" }
              }
            >
              {errorState.cnic.message}
            </span>
            <br />
            <label htmlFor="cnicissue">CNIC Issuance Date and Time</label>{" "}
            <br />
            <input
              type="datetime-local"
              name="cnicIssue"
              value={formState.cnicIssue}
              onChange={handleChange}
            />
          </div>
        </div>
        <br />
        <br />
        <div className={Style.main}>
          <div>
            <label htmlFor="mobile">Mobile</label>
            <br />
            <input
              placeholder="03xx-xxxxxxx"
              type="mobile-number"
              name="mobile"
              ref={mobileRef}
              value={formState.mobile}
              onChange={handleChange}
            />
            <span
              style={
                formState.mobile === "" && choice === true
                  ? { display: "block", marginTop: "10px", color: "red" }
                  : { display: "none" }
              }
            >
              {errorState.mobile.message}
            </span>
            <br />
          </div>
          <div className={Style.email}>
            <label htmlFor="email">Email</label>
            <br />
            <input
              placeholder="Enter Your Email"
              type="email"
              name="email"
              value={formState.email}
              onChange={handleChange}
            />
            <span
              style={
                formState.email === "" && choice === true
                  ? { display: "block", marginTop: "10px", color: "red" }
                  : { display: "none" }
              }
            >
              {errorState.email.message}
            </span>{" "}
            <br />
          </div>
        </div>
        <br />
        <div className={Style.main1}>
          <div>
            <label htmlFor="province">Select your Province or State</label>
            <br />
            <select name="provinceorstate" onChange={handleChange}>
              <option>Select your Province</option>
              <option value="Punjab">Punjab</option>
              <option value="Sindh">Sindh</option>
              <option value="KPK">KPK</option>
              <option value="Balochistan">Balochistan</option>
            </select>
            <br />
            <span
              style={
                formState.provinceorstate === "" && choice === true
                  ? { display: "block", marginTop: "10px", color: "red" }
                  : { display: "none" }
              }
            >
              {errorState.provinceorstate}
            </span>
          </div>
          <div className={Style.games}>
            <label htmlFor="games">Select Your Favorite Games</label>
            <br />
            <select id="games" name="games" onChange={handleChange}>
              <option>Please Select Games</option>
              <option value="Swimming">Swimming</option>
              <option value="Cycling">Cycling</option>
              <option value="Boxing">Boxing</option>
              <option value="Cricket">Cricket</option>
            </select>
            <br />
            <span
              style={
                formState.games === "" && choice === true
                  ? { display: "block", marginTop: "10px", color: "red" }
                  : { display: "none" }
              }
            >
              {errorState.games}
            </span>
          </div>
        </div>
        <br />
        <label>Religion:</label> <br />
        <br />
        <div className="relegion" onChange={handleChange} name="relegion">
          {religion.map((rel) => (
            <>
              <input type="radio" value={rel} name="relegion" />
              <label>{rel}</label>
            </>
          ))}
        </div>
        <span
          style={
            formState.relegion === "" && choice === true
              ? { display: "block", marginTop: "10px", color: "red" }
              : { display: "none" }
          }
        >
          {errorState.relegion}
        </span>
        <br />
        <br />
        <div className={Style.main3}>
          <div>
            <lable htmlFor="qualification">
              Enter Your Highest Qualification
            </lable>
            <br />
            <input
              placeholder="Highest Qualification"
              type="text"
              name="qualification"
              value={formState.qualification}
              onChange={handleChange}
            />
          </div>{" "}
          <div className={Style.dob}>
            <lable htmlFor="dob">Enter Your Date Of Birth</lable>
            <br />
            <input
              type="date"
              name="dob"
              value={formState.dob}
              onChange={handleChange}
            />
          </div>
        </div>
        <h3>Favourite Languages :</h3>
        <input type="checkbox" name="language1" value="Java Script" />
        <label htmlFor="language1"> JavaScript</label>
        <input type="checkbox" name="language2" value="React JS" />
        <label htmlFor="language2"> React JS</label>
        <input type="checkbox" name="language3" value="Node JS" />
        <label htmlFor="vehicle3"> Node JS</label>
        <input type="checkbox" name="language4" value="Python" />
        <label htmlFor="language4"> Python</label>
        <input type="checkbox" name="language5" value="C,C++" />
        <label htmlFor="language5"> C, C++</label>
        <br />
        <br />
        <label>Description</label>
        <br />
        <br />
        <textarea name="message" rows="8" cols="80"></textarea>
        <br />
        <br />
        <div className={Style.main4}>
          <div>
            <lable htmlFor="password">Password</lable>
            <br />
            <input
              type="password"
              name="password"
              ref={passwordRef}
              value={formState.password}
              onChange={handleChange}
            />
            <span
              style={
                formState.password === "" && choice === true
                  ? { display: "block", marginTop: "10px", color: "red" }
                  : { display: "none" }
              }
            >
              {errorState.password.message}
            </span>
            <br />
          </div>
          <div className={Style.password}>
            <lable htmlFor="confirmpassword">Confirm Password</lable>
            <br />
            <input
              placeholder="Confirm Your Password"
              type="password"
              name="confirmpassword"
              value={formState.confirmpassword}
              onChange={handleChange}
            />
            <br />
            {formState.password !== "" &&
            formState.password === formState.confirmpassword ? (
              <span>Password matched </span>
            ) : (
              " "
            )}
          </div>
        </div>
        <br />
        Gender:
        <br />
        <input type="radio" id="male" name="gender" value="Male" />
        <label htmlFor="gender">Male</label>
        <input type="radio" id="female" name="gender" value="Female" />{" "}
        <label htmlFor="relegion">Female</label>
        <input type="radio" id="other" name="gender" value="Other" />{" "}
        <label htmlFor="rgender">Other</label>
        <br />
        <br />
        <div>
          <button className={Style.button} onClick={formSubmitted}>
            SUBMIT DATA
          </button>
        </div>
      </form>
    </div>
  );
}
export default App;

{
  /*
  <div className="File">
            <input
              type="file"
              id="fileInput"
              name="image-upload"
              onChange={imageHandler}
              accept="image/*"
            />
            <label
              for="fileInput"
              className="File"
              style={
                fileSrc !== null
                  ? { display: "none", border: "3px solid green" }
                  : { display: "block" }
              }
            >
              Choose a photo
            </label>
            <img
              src={fileSrc}
              alt="UploadedPhoto"
              className="imgSetting"
              width="410px"
              height="320px"
              style={
                fileSrc === null ? { display: "none" } : { display: "block" }
              }
            />
            <label
              for="fileInput"
              className="File"
              width="410px"
              height="320px"
              style={
                fileSrc === null
                  ? { display: "none" }
                  : { display: "block", marginLeft: "335px" }
              }
            >
              Choose any other photo
            </label>
          </div>


          const [fileSrc, setFileSrc] = useState(null);
  const imageHandler = (e) => {
    const reader = new FileReader();
    reader.onload = () => {
      if (reader.readyState === 2) {
        setFileSrc(reader.result);
      }
    };
    try {
      reader.readAsDataURL(e.target.files[0]);
    } catch {
      return 0;
    }
  };
            */
}
