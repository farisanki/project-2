// global variable

const page = document.querySelector('.page');
const pageHeader = document.querySelector('.page-header');
const studentList = document.querySelectorAll('.student-item');
const studentName = document.querySelectorAll('.student-details h3');
const error = document.querySelector('.error')


//showPage function that shows and hides students in pages

 const showPage = (list, pageNumber) => {
       for(let i = 0; i < studentList.length; i++){
        studentList[i].style.display = 'none';

    }
 let studentFound = [];
      if(error){
       page.removeChild(error);
    }
      if(list.length > 0) {
        const numberOfPages = Math.ceil(list.length/10);
// checkes if the number of student is even in page
        let studentInpage = 10;
        if((list.length % 10 > 0) && (pageNumber === numberOfPages)){
        studentInpage = list.length % 10;
        }
        const F = (pageNumber === 1) ? 0 : (pageNumber - 1) * 10;
        const endIndex = F + studentInpage;
        if(studentFound.length > 0){
        for(let i = F; i < endIndex; i++){
        studentList[list[i]].style.display = '';
      }
      }
        else {
          for(let i = F; i < endIndex; i++){
          list[i].style.display = '';
    }
    }
    }
  };
//appendPageLinks function

const appendPageLinks = (list) => {
    let pageNumber = 0;
    if(document.querySelector('.pagination')){
    page.removeChild(document.querySelector('.pagination'));
    }

    if(list.length > 0) {
    const createAppendPageLinks = (() => {
      const paginationDiv = document.createElement('div');
      paginationDiv.className = 'pagination';
      const paginationUl = document.createElement('ul');
      for(let i = 0; i < Math.ceil(list.length/10); i++){
      const a = document.createElement('a');
      a.href = '#';
      a.textContent = i + 1;
      const li = document.createElement('li');
      li.appendChild(a);
      paginationUl.appendChild(li);
    }
    //adds an active class
      paginationUl.children[0].children[0].className = 'active';
      paginationDiv.appendChild(paginationUl);
     page.appendChild(paginationDiv);
    })();
    const checkPageNumber = () => {
    let pageNumber = 0;
    const pageLinks = document.querySelectorAll('.pagination a');
    for(let i = 0; i < Math.ceil(list.length/10); i++){
    if(pageLinks[i].className === 'active'){
    pageNumber = parseInt(pageLinks[i].textContent)
    break;
  }
  }
    return pageNumber;
  };
  // show list and page number
        showPage(list, checkPageNumber());

        document.querySelector('.pagination').addEventListener('click', (event) => {
            if(event.target.tagName === "A"){
                const pageLinks = document.querySelectorAll('.pagination a');
                for(let i = 0; i < Math.ceil(list.length/10); i++){
                    pageLinks[i].className = '';
                }
                event.target.className  = 'active';
                showPage(list, checkPageNumber());
            }
        });
    }
    else {
        showPage(list, pageNumber);
    }
};
appendPageLinks(studentList);
