//get input status
var CourseName = document.getElementById("CourseName");
var CourseCatigory = document.getElementById("CourseCatigory");
var CoursePrice = document.getElementById("CoursePrice");
var CourseDescription = document.getElementById("CourseDescription");
var CourseCapacity = document.getElementById("CourseCapacity");
var tbody = document.getElementById("tbody");
var Submit = document.getElementById("Submit");
var Clear = document.getElementById("Clear");
var deleteAll = document.getElementById("deleteAll");
var search = document.getElementById("search");
var currentIndex = 0;
var courses;

if(JSON.parse(localStorage.getItem("courses")) == null){
    courses=[];
}

else{
    courses=JSON.parse(localStorage.getItem("courses"));
    readData();
}

Submit.onclick = function(event){
    event.preventDefault();
    if(Submit.value == "Submit"){
    addCourse();
    Swal.fire({
      position: 'center',
      icon: 'success',
      title: 'Course added succesfully!',
      showConfirmButton: false,
      timer: 1500
    })
}
    else
    updateCourse(currentIndex);
    
      printData();
      clearData();
      readData();
      CourseName.classList.remove('is-valid');
      CourseCatigory.classList.remove('is-valid');
      CoursePrice.classList.remove('is-valid');
      CourseDescription.classList.remove('is-valid');
      CourseCapacity.classList.remove('is-valid');
     
}

//create course
function addCourse(){
    var course = {
        CourseName:CourseName.value,
        CourseCatigory:CourseCatigory.value,
        CoursePrice:CoursePrice.value,
        CourseDescription:CourseDescription.value,
        CourseCapacity:CourseCapacity.value
    };
    courses.push(course);
    localStorage.setItem("courses",JSON.stringify(courses));
}

function printData(){
    console.log(courses);
}

//clear data
function clearData(){
    CourseName.value="";
    CourseCatigory.value="";
    CoursePrice.value="";
    CourseDescription.value="";
    CourseCapacity.value="";
}

//read data
function readData() {
    var data="";
    for(var i=0 ; i<courses.length ; i++)
data+=`
<tr>
    <td>${i+1}</td>
    <td>${courses[i].CourseName}</td>
    <td>${courses[i].CourseCatigory}</td>
    <td>${courses[i].CoursePrice}</td>
    <td>${courses[i].CourseDescription}</td>
    <td>${courses[i].CourseCapacity}</td>
    <td> <button class="btn btn-info" onclick="getCourse(${i})">Update</button> </td> 
    <td> <button class="btn btn-danger" onclick="deleteCourse(${i})">Delete</button> </td>
</tr>
`
tbody.innerHTML = data;
}

//delete course
function deleteCourse(x){

Swal.fire({
    title: 'Are you sure?',
    text: "You won't be able to revert this!",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Yes, delete it!'
  }).then((result) => {
    if (result.isConfirmed) {
        console.log(x);
        courses.splice(x,1);
        localStorage.setItem("courses",JSON.stringify(courses));
        readData();
      Swal.fire(
        'Deleted!',
        'Course has been deleted.',
        'success'
      )
    }
  })

}

deleteAll.onclick = function(){
    Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
      }).then((result) => {
        if (result.isConfirmed) {
            courses=[];
            localStorage.setItem("courses",JSON.stringify(courses));
            readData();
          Swal.fire(
            'Deleted!',
            'Courses has been deleted.',
            'success'
          )
        }
      })
    
}

//search
search.onkeyup = function(){
    var data="";
    for(var i=0 ; i<courses.length ; i++){
    if(courses[i].CourseName.toLowerCase().includes(search.value.toLowerCase())){
data+=`
<tr>
    <td>${i+1}</td>
    <td>${courses[i].CourseName}</td>
    <td>${courses[i].CourseCatigory}</td>
    <td>${courses[i].CoursePrice}</td>
    <td>${courses[i].CourseDescription}</td>
    <td>${courses[i].CourseCapacity}</td>
    <td> <button class="btn btn-info" onclick="getCourse(${i})">Update</button> </td> 
    <td> <button class="btn btn-danger" onclick="deleteCourse(${i})">Delete</button> </td>
</tr>
`
tbody.innerHTML = data;
    }
    }
}


//update

function getCourse(index){
var selCourse = courses[index];
CourseName.value=selCourse.CourseName;
CourseCatigory.value=selCourse.CourseCatigory;
CoursePrice.value=selCourse.CoursePrice;
CourseDescription.value=selCourse.CourseDescription;
CourseCapacity.value=selCourse.CourseCapacity;
Submit.value="Update Course";

}

function updateCourse(i){
    var course = {
        CourseName:CourseName.value,
        CourseCatigory:CourseCatigory.value,
        CoursePrice:CoursePrice.value,
        CourseDescription:CourseDescription.value,
        CourseCapacity:CourseCapacity.value
    };
    Submit.removeAttribute('disabled');
    courses[i]=course;
    localStorage.setItem("courses",JSON.stringify(courses));
    Submit.value="Submit";
    Swal.fire({
      position: 'center',
      icon: 'success',
      title: 'Course updated succesfully!',
      showConfirmButton: false,
      timer: 1500
    })
    clearData();
    readData();
}

/* chars
 {3 - 10}
 first is capital
 CourseName input
 */
CourseName.onkeyup = function(){
  var pattern = /^[A-Z][a-z\s]{2,10}$/;
  if(pattern.test(CourseName.value.trim())){
    if(CourseName.classList.contains('is-invalid')){
      CourseName.classList.replace('is-invalid' , 'is-valid')
    }else{
      Submit.removeAttribute('disabled');
      CourseName.classList.add('is-valid');
    }

  }
  else{
    if(CourseName.classList.contains('is-valid')){
      CourseName.classList.replace('is-valid' , 'is-invalid')
    }
    else{
      Submit.setAttribute('disabled' , 'disabled' );
      CourseName.classList.add('is-invalid');
    }
  }
}

//####################################################
// CourseName input
CourseCatigory.onkeyup = function(){
  var pattern = /^[A-Z][a-z\s]{2,20}$/;
  if(pattern.test(CourseCatigory.value.trim())){
    if(CourseCatigory.classList.contains('is-invalid')){
      CourseCatigory.classList.replace('is-invalid' , 'is-valid')
    }else{
      Submit.removeAttribute('disabled');
      CourseCatigory.classList.add('is-valid');
    }

  }
  else{
    if(CourseCatigory.classList.contains('is-valid')){
      CourseCatigory.classList.replace('is-valid' , 'is-invalid')
    }
    else{
      Submit.setAttribute('disabled' , 'disabled' );
      CourseCatigory.classList.add('is-invalid');
    }
  }
}

//####################################################
// CoursePrice input
CoursePrice.onkeyup = function(){
  var pattern = /^[0-9]{2,4}$/;
  if(pattern.test(CoursePrice.value.trim())){
    if(CoursePrice.classList.contains('is-invalid')){
      CoursePrice.classList.replace('is-invalid' , 'is-valid')
    }else{
      Submit.removeAttribute('disabled');
      CoursePrice.classList.add('is-valid');
    }

  }
  else{
    if(CoursePrice.classList.contains('is-valid')){
      CoursePrice.classList.replace('is-valid' , 'is-invalid')
    }
    else{
      Submit.setAttribute('disabled' , 'disabled' );
      CoursePrice.classList.add('is-invalid');
    }
  }
}

//####################################################
// CourseDescription input
CourseDescription.onkeyup = function(){
  var pattern = /^[a-z\s]{3,100}$/;
  if(pattern.test(CourseDescription.value.trim())){
    if(CourseDescription.classList.contains('is-invalid')){
      CourseDescription.classList.replace('is-invalid' , 'is-valid')
    }else{
      Submit.removeAttribute('disabled');
      CourseDescription.classList.add('is-valid');
    }

  }
  else{
    if(CourseDescription.classList.contains('is-valid')){
      CourseDescription.classList.replace('is-valid' , 'is-invalid')
    }
    else{
      Submit.setAttribute('disabled' , 'disabled' );
      CourseDescription.classList.add('is-invalid');
    }
  }
}

//####################################################
// CourseCapacity input
CourseCapacity.onkeyup = function(){
  var pattern = /^[0-9]{2,4}$/;
  if(pattern.test(CourseCapacity.value.trim())){
    if(CourseCapacity.classList.contains('is-invalid')){
      CourseCapacity.classList.replace('is-invalid' , 'is-valid')
    }else{
      Submit.removeAttribute('disabled');
      CourseCapacity.classList.add('is-valid');
    }

  }
  else{
    if(CourseCapacity.classList.contains('is-valid')){
      CourseCapacity.classList.replace('is-valid' , 'is-invalid')
    }
    else{
      Submit.setAttribute('disabled' , 'disabled' );
      CourseCapacity.classList.add('is-invalid');
    }
  }
}