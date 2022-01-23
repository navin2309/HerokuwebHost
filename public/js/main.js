const submitBtn = document.getElementById("submitBtn");
const city_name = document.getElementById("city_name");
const cityName = document.getElementById("cityName");
const temp_real_val = document.getElementById("temp_real_val");
const temp_status = document.getElementById("temp_status");
const datahide = document.querySelector(".middle_layer");

const getinfo = async(event) =>{
    event.preventDefault();
    let cityval = cityName.value;
    
    if(cityval=== ""){
        city_name.innerText = `Please write the name before search`;
        datahide.classList.add("data_hide");
    }else{
        try{
            let url = `http://api.openweathermap.org/data/2.5/weather?q=${cityval}&units=metric&id=524901&appid=da3617535ac5ea67b652a01f362c08c8`    
            const response = await fetch(url);
            const data = await response.json();
            const arrayData = [data];
            
            city_name.innerText = `${arrayData[0].name}, ${arrayData[0].sys.country}`;
            temp_real_val.innerText = arrayData[0].main.temp;
            const tempStatus = arrayData[0].weather[0].main;

            //Condition to check sunny and cloudy
            if (tempStatus == "Clear") {
                temp_status.innerHTML = "<i class='fas fa-sun' style='color:#eccc68'></i>";
            } else if (tempStatus == "Clouds") {
                temp_status.innerHTML = "<i class='fas fa-cloud' style='color:#f1f2f6'></i>";
            } else if (tempStatus == "Rain") {
                temp_status.innerHTML = "<i class='fas fa-cloud-rain' style='color:#a4b0be'></i>";
            } else {
                temp_status.innerHTML = "<i class='fas fa-sun' style='color:#eccc68'></i>";
            }
            datahide.classList.remove("data_hide");

        }catch{
            city_name.innerText = `Please enter the city name properly`;
            datahide.classList.add("data_hide");
        }

    }
}

submitBtn.addEventListener('click',getinfo);