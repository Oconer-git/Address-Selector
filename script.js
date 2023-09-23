//Oconer, Donell Carl G.   section:4A BS INFOTECH

var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
        
       //I converted the json into javascript object, stored it on variable named data
       var data = JSON.parse(xhttp.responseText);
       
       // First, I get the id of each select element and store them in constant variables
       const regionSelect = document.getElementById('region');
       const provinceSelect = document.getElementById('province');
       const municipalSelect = document.getElementById('municipal');
       const barangaySelect = document.getElementById('barangay');
   
       
       // on this function is to load all the region_name such as REGION XIII, REGION 1 NCR and etc. 
       //it shows region_name but the value will be the 'key' such as '4a', '13' and etc.
       for (const region in data) {
           const option = document.createElement('option');
           option.value = region;
           option.textContent = data[region].region_name;
           regionSelect.appendChild(option);
       }
   
       // when you click the first select that, it will add value to the rest of the selection
       // the text will appear 'Select Province' 'Select Municipal' 'Select Barangay'
       regionSelect.addEventListener('change', () => {
           const selectedRegion = regionSelect.value;
           provinceSelect.innerHTML = '<option value="">Select Province</option>';
           municipalSelect.innerHTML = '<option value="">Select Municipal</option>';
           barangaySelect.innerHTML = '<option value="">Select Barangay</option>';

           //when the select element that has an id of 'region' has already have a value then we will load
           //items from province list
           if (selectedRegion !== '') {
               const provinces = data[selectedRegion].province_list;
               for (const province in provinces) {
                   const option = document.createElement('option');
                   option.value = province;
                   option.textContent = province;
                   provinceSelect.appendChild(option);
               }
           }
       });
   
       // same thing happens here, same logic from the previous addeventlistener
       provinceSelect.addEventListener('change', () => {
           //get the value from the the previous select and store it on a variable
           const selectedProvince = provinceSelect.value;
           municipalSelect.innerHTML = '<option value="">Select Municipal</option>';
           barangaySelect.innerHTML = '<option value="">Select Barangay</option>';
   
           //if thre is a value on the province select then load all the municipals from 'municipal_list'
           //as an option for the select
           if (selectedProvince !== '') {
               const municipals = data[regionSelect.value].province_list[selectedProvince].municipality_list;
            // I use 'for of' instead of 'for in' because municipal_list is an array not in an object structure
               for (const municipalObj of municipals) {
                   const municipal = Object.keys(municipalObj)[0];
                   const option = document.createElement('option');
                   option.value = municipal;
                   option.textContent = municipal;
                   municipalSelect.appendChild(option);
               }
           }
       });
   
       //Same logic applies here, this is for loading the barangays
       municipalSelect.addEventListener('change', () => {
           const selectedProvince = provinceSelect.value;
           const selectedMunicipal = municipalSelect.value;
           barangaySelect.innerHTML = '<option value="">Select Barangay</option>';
   
           if (selectedMunicipal !== '') {
            //samne thing here it's an array, find the selectedMunicipal
               const barangays = data[regionSelect.value].province_list[selectedProvince].municipality_list.find(obj => Object.keys(obj)[0] === selectedMunicipal)[selectedMunicipal].barangay_list;
               for (const barangay of barangays) {
                   const option = document.createElement('option');
                   option.value = barangay;
                   option.textContent = barangay;
                   barangaySelect.appendChild(option);
               }
           }
       });
}
};
    xhttp.open("GET", "data.json", true);
    xhttp.send();
    


