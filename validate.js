//đối tượng validation
//opts tuong trung cho thuoc tinh duoc tham chieu den ham validator
function Validator(opts) {
  let selecterRules = {};

  //ham thuc hien validate
  function validateCheck(inputValue, rule) {
    //parent element la de lay ra the cha cua the input
    let errorEle = inputValue.parentElement.querySelector(".message-error");
    let errorMessage;

    //lay ra cac rule cua selecter
    let rules = selecterRules[rule.selecter];

    //lap qua tung rule va kiem tra
    //neu co loi thi break kiem tra
    for (let i = 0; i < rules.length; i++) {
      errorMessage = rules[i](inputValue.value);
      if (errorMessage) break;
    }

    if (errorMessage) {
      errorEle.innerHTML = errorMessage;
      inputValue.parentElement.classList.add("invalid");
    } else {
      errorEle.innerHTML = "";
      inputValue.parentElement.classList.remove("invalid");
    }

    return !errorMessage;
  }
  ///////////////////////////////////////////

  //lấy ra đối tượng form từ trong html
  let formEle = document.querySelector(opts.form);

  if (formEle) {
    //thuc hien lap qua tung rule va kiem tra khi an onsubmit
    formEle.onsubmit = function (e) {
      e.preventDefault();

      let isFormValid = true;

      opts.rules.forEach(function (rule) {
        let inputValue = formEle.querySelector(rule.selecter);
        let isValid = validateCheck(inputValue, rule);

        if (!isValid) {
          isFormValid = false;
        }
      });

      //Hien thi thong tin ma nguoi dung da nhap neu form da duoc validate dung
      if (isFormValid) {
        if (typeof opts.onSubmit === "function") {
          let validInput = formEle.querySelectorAll("[name]");

          console.log(validInput);
          // let dateValue = document.querySelector('date-birth');
          // console.log(dateValue.value);

          let formValues = Array.from(validInput).reduce(function (values,input) {
            console.log(input.name);
            if (input.name === "book-pay" ) {
              return (values[input.name] = checkPay(input.value)) && values;
            }

            if (input.name === "book-option") {
              return (values[input.name] = checkFlight(input.value)) && values;
            }

            return (values[input.name] = input.value) && values;
          },{});

          //Check gioi tinh/////
          let checkGenderRadio =  document.querySelectorAll("input[name=gender]");

          for (let i = 0; i < checkGenderRadio.length; i++) {
                if (checkGenderRadio[i].checked) {
                  genderValue = document.getElementById("gender-value").textContent ="Giới Tính: " +  checkGender(checkGenderRadio[i].value);
                }
          }
          //////////////////////////

        // Tat PopUp
        let closeButton = document.getElementById("close-success");
        closeButton.addEventListener("click", function () {
          let successPopup = document.querySelector(".pop-up-success");
          successPopup.style.display = "none";
          window.location.reload();
        });

          // truyen lai gia tri vao truong onSubmit ben html
          opts.onSubmit(formValues);
        }
      }
    };
    ///////////////////////////////////////////////////////////////////////////

    //lap qua cac rule
    opts.rules.forEach(function (rule) {
      if (Array.isArray(selecterRules[rule.selecter])) {
        selecterRules[rule.selecter].push(rule.test);
      } else {
        selecterRules[rule.selecter] = [rule.test];
      }

      let inputValue = formEle.querySelector(rule.selecter);

      if (inputValue) {
        inputValue.onblur = function () {
          validateCheck(inputValue, rule);
        };
      }
    });
  }
}
//////////////////////////////////////////////

//phuong thuc check xem người dùng đã điền vào ô chưa
Validator.isRequired = function (selecter) {
  //day la thang rule
  return {
    selecter: selecter,
    test: function (valueCheck) {
      return valueCheck.trim() ? undefined : "&#8855; Please fill this blank";
    },
  };
};

Validator.isEmail = function (selecter) {
  return {
    selecter: selecter,
    test: function (valueCheck) {
      let patternEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
      return patternEmail.test(valueCheck)
        ? undefined
        : "&#8855; Please enter valid email";
    },
  };
};

Validator.isPhoneNumber = function (selecter) {
  return {
    selecter: selecter,
    test: function (valueCheck) {
      let patternPhoneNumber = /^\+?\d{9,10}$/;
      return patternPhoneNumber.test(valueCheck)
        ? undefined
        : "&#8855; Please enter valid phone number";
    },
  };
};

Validator.isNumeric = function (selecter) {
  return {
    selecter: selecter,
    test: function (valueCheck) {
      let patternNumber = /^\d+$/;
      return patternNumber.test(valueCheck)
        ? undefined
        : "&#8855; Please enter number";
    },
  };
};

Validator.isMinLength = function (selecter, minLength) {
  return {
    selecter: selecter,
    test: function (valueCheck) {
      return valueCheck.length >= minLength
        ? undefined
        : "&#8855; Please enter minimum " + minLength + " characters";
    },
  };
};

Validator.isSelected = function (selecter) {
  return {
    selecter: selecter,
    test: function (valueCheck) {
     return (valueCheck == "" || valueCheck == 0) ? "&#8855; You Don't Selected" : undefined
    },
  };  
};

function checkGender(valueCheck) {
  switch (valueCheck) {
    case "1": return "Nam";
    case "2": return "Nữ";
  }
}

let checkPay = function (valueCheck) {
  switch (valueCheck) {
    case "1":
      return "Cash";
      break;
    case "2":
      return "Visa"
      break;
    case "3":
      return "Master Card";  
      break;
  }
};

function checkFlight(valueCheck) {
  switch (valueCheck) {
    case "1":
      return "HaNoi - SaiGon";
      break;
    case "2":
      return "HaNoi - USA"
      break;
    case "3":
      return "SaiGon - ThaiLand";  
      break;
  }
}

const reserBtn = document.getElementById("reset");

reserBtn.addEventListener("click", function (e) {
  e.preventDefault();
  window.location.reload();
});
