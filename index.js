var data = [
    { id: 10, name: "PARCEL1", sequence: 1, group: "Mumbai" },
    { id: 11, name: "PARCEL2", sequence: 2, group: "Mumbai" },
    { id: 13, name: "PARCEL3", sequence: 3, group: "Mumbai" },
    { id: 19, name: "PARCEL4", sequence: 4, group: "Delhi" },
    { id: 18, name: "PARCEL5", sequence: 5, group: "Delhi" },
    { id: 21, name: "PARCEL6", sequence: 6, group: "Kolkata" },
    { id: 12, name: "PARCEL7", sequence: 7, group: "Kolkata" },
    { id: 22, name: "PARCEL8", sequence: 8, group: "Kolkata" },
    { id: 23, name: "PARCEL9", sequence: 9, group: "Kolkata" },
    { id: 24, name: "PARCEL10", sequence: 10, group: "Mumbai" },
    { id: 25, name: "PARCEL11", sequence: 11, group: "Mumbai" },
    { id: 31, name: "PARCEL12", sequence: 12, group: "Mumbai" },
    { id: 34, name: "PARCEL13", sequence: 13, group: "Mumbai" },
    { id: 35, name: "PARCEL14", sequence: 14, group: "Delhi" },
    { id: 41, name: "PARCEL15", sequence: 15, group: "Delhi" },
    { id: 42, name: "PARCEL16", sequence: 16, group: "Delhi" },
    { id: 43, name: "PARCEL17", sequence: 17, group: "Delhi" },
    { id: 44, name: "PARCEL18", sequence: 18, group: "Kolkata" },
    { id: 53, name: "PARCEL19", sequence: 19, group: "Kolkata" },
    { id: 57, name: "PARCEL20", sequence: 20, group: "Kolkata" }
  ];
  
  var parcelsContainer = document.getElementById("parcels-container");
  var selectedParcel = null;
  
  function generateParcelElement(parcel) {
    var element = document.createElement("div");
    element.classList.add("parcel");
    element.innerText = parcel.name;
    element.style.backgroundColor = getGroupColor(parcel.group);
  
    element.addEventListener("click", function() {
      toggleParcelSelection(parcel.id);
    });
  
    return element;
  }
  
  function renderParcels() {
    parcelsContainer.innerHTML = "";
  
    data.forEach(function(parcel) {
      var element = generateParcelElement(parcel);
      parcelsContainer.appendChild(element);
    });
  }
  
  function getGroupColor(group) {
    // Define your color mapping logic here based on the group
    if (group === "Mumbai") return "#DC143C";
    if (group === "Delhi") return "#FFD700";
    if (group === "Kolkata") return "#1E90FF";
  }
  
  function toggleParcelSelection(parcelId) {
    var parcel = data.find(function(item) {
      return item.id === parcelId;
    });
  
    if (parcel) {
      if (selectedParcel && selectedParcel.id === parcelId) {
        selectedParcel = null;
      } else {
        selectedParcel = parcel;
      }
  
      renderParcels();
      updateSelectedParcelField();
    }
  }
  
  function updateSelectedParcelField() {
    var selectedParcelField = document.getElementById("selected-parcel");
    if (selectedParcel) {
      selectedParcelField.innerText = selectedParcel.name;
    } else {
      selectedParcelField.innerText = "";
    }
  }
  
  function addParcelAfter() {
    var nameInput = document.getElementById("name-input");
    var groupSelect = document.getElementById("group-select");
    
    var name = nameInput.value;
    var group = groupSelect.value;
  
    if (!selectedParcel) {
      alert("Please select a parcel first.");
      return;
    }
  
    var sequence = selectedParcel.sequence + 1;
    var newParcel = { id: getNextParcelId(), name: name, sequence: sequence, group: group };
    
    data.splice(sequence - 1, 0, newParcel);
    updateSequenceNumbers(sequence);
  
    renderParcels();
    resetInputFields();
  }
  
  function addParcelBefore() {
    var nameInput = document.getElementById("name-input");
    var groupSelect = document.getElementById("group-select");
    
    var name = nameInput.value;
    var group = groupSelect.value;
  
    if (!selectedParcel) {
      alert("Please select a parcel first.");
      return;
    }
  
    var sequence = selectedParcel.sequence;
    var newParcel = { id: getNextParcelId(), name: name, sequence: sequence, group: group };
    
    data.splice(sequence - 1, 0, newParcel);
    updateSequenceNumbers(sequence);
  
    renderParcels();
    resetInputFields();
  }
  
  function replaceParcel() {
    var nameInput = document.getElementById("name-input");
    var groupSelect = document.getElementById("group-select");
    
    var name = nameInput.value;
    var group = groupSelect.value;
  
    if (!selectedParcel) {
      alert("Please select a parcel first.");
      return;
    }
  
    var sequence = selectedParcel.sequence;
    var updatedParcel = { id: selectedParcel.id, name: name, sequence: sequence, group: group };
    
    data.splice(sequence - 1, 1, updatedParcel);
  
    renderParcels();
    resetInputFields();
  }
  
  function deleteParcel() {
    if (!selectedParcel) {
      alert("Please select a parcel first.");
      return;
    }
  
    var sequence = selectedParcel.sequence;
    data.splice(sequence - 1, 1);
    updateSequenceNumbers(sequence);
  
    renderParcels();
    resetInputFields();
  }
  
  function refreshData() {
    // Perform any necessary data refreshing here
    renderParcels();
    resetInputFields();
  }
  
  function showFinalData() {
    console.log(data);
  }
  
  function getNextParcelId() {
    var maxId = Math.max.apply(
      Math,
      data.map(function(parcel) {
        return parcel.id;
      })
    );
    return maxId + 1;
  }
  
  function updateSequenceNumbers(startSequence) {
    for (var i = startSequence; i <= data.length; i++) {
      data[i - 1].sequence = i;
    }
  }
  
  function resetInputFields() {
    var nameInput = document.getElementById("name-input");
    var groupSelect = document.getElementById("group-select");
  
    nameInput.value = "";
    groupSelect.value = "";
  }
  
  // Event listeners for buttons
  document.getElementById("add-after-btn").addEventListener("click", addParcelAfter);
  document.getElementById("add-before-btn").addEventListener("click", addParcelBefore);
  document.getElementById("replace-btn").addEventListener("click", replaceParcel);
  document.getElementById("delete-btn").addEventListener("click", deleteParcel);
  document.getElementById("refresh-btn").addEventListener("click", refreshData);
  document.getElementById("show-final-btn").addEventListener("click", showFinalData);
  
  // Initial render
  renderParcels();
  