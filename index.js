

const handlesearch = async () => {
    const res = await fetch('https://openapi.programming-hero.com/api/videos/categories')
    const data = await res.json();
    const tab = data.data

    const tabcontainer = document.getElementById('tab-container')
    tab.forEach(category => {
        const div = document.createElement('div')
        div.innerHTML = `
        <a onclick="clickhandler('${category.category_id}')" class="tab">${category.category}</a> 
        `
        tabcontainer.appendChild(div)
    })
    
}

const sortfunction  = async (categoryId) => {
    const res = await fetch('https://openapi.programming-hero.com/api/videos/categories')
    const data = await res.json();
    const categories = data.data;
    const sortedCards = [];
    for (const category of categories) {
        const res = await fetch(`https://openapi.programming-hero.com/api/videos/category/${category.category_id}`);
        const data = await res.json();

        const cardContainer = document.getElementById("cards");
            
            data.data.sort((a, b) => parseInt(b.others.views) - parseInt(a.others.views));
            sortedCards.push(...data.data);
            cardContainer.innerHTML = "";
            sortedCards.forEach(info => {
                const div = document.createElement('div');
                div.className = 'card w-full  bg-base-100 shadow-xl';

                const formattedTime = formatTime(parseInt(info.others.posted_date));

                let timeElement = '';
                if (formattedTime) {
                    timeElement = `<button class="rounded bg-slate-500 md:w-2/3 lg:w-50 -mt-10 text-center m-10">${formattedTime}</button>`;
                }
                div.innerHTML = `
                    <div class="card-body w-full">
                        <figure class="w-50 h-40 thumbnail-container"><img src=${info.thumbnail} /></figure>
                        ${timeElement}
                        <div class=" item-center justify-center inline"> 
                            <div class="avatar mb-0">
                                <div class="w-12 h-12 rounded-full mr-2">
                                    <img src=${info.authors[0].profile_picture} />
                                </div>
                                <div>
                                    <h2 class="card-title">${info.title}</h2>
                                    <p>${info.authors[0].profile_name}
                                    ${info.authors[0]?.verified ? '<i class="fa-solid fa-certificate"></i>' : ''}
                                    </p>
                                    <p class="card-views">${info.others.views} views</p>
                                </div>
                            </div>
                        </div>
                    </div>
                `;
                cardContainer.appendChild(div);
                
            });
        }
      
       
    }

const formatTime = (seconds) => {
    return seconds
        ? `${String(Math.floor(seconds / 3600)).padStart(2, '0')} hours ${String(Math.floor((seconds % 3600) / 60)).padStart(2, '0')} mins`
        : ''; // 
}
const clickhandler = async (categoryId) => {
    const res = await fetch(`https://openapi.programming-hero.com/api/videos/category/${categoryId}`)
    const data = await res.json();
    // console.log(data.data)
    const cardcontainer = document.getElementById("cards")
    if (!data || !data.data || data.data.length === 0) {
       
        
        cardcontainer.innerHTML = 
            ` <div class="flex-1 flex-col items-center justify-center mt-10 mx-auto">
             <figure class="pl-20"> <img src="./Icon.png" alt="" /></figure>
             <h2 class="text-3xl text-center ">Oops!! Sorry, There is <br> no content here</h2>
             </div>
        
            `;

        
    } else {
       
        cardcontainer.innerHTML = ""; 
        data.data.forEach(info => {
            const div = document.createElement('div');
            div.className = 'card w-full  bg-base-100 shadow-xl';

            const formattedTime = formatTime(parseInt(info.others.posted_date));

            let timeElement = ''; 
            if (formattedTime) {
                timeElement = `<button class="rounded bg-slate-500 md:w-2/3 lg:w-50 -mt-10 text-center m-10">${formattedTime}</button>`;
            }
            div.innerHTML = `
                    <div class="card-body w-full ">
                        <figure class=" w-50 h-40 thumbnail-container"><img src=${info.thumbnail} /></figure>
                        ${timeElement}
                        <div class" flex item-center justify-center inline"> 
                            <div class="avatar mb-0">
                                <div class="w-12 h-12 rounded-full mr-2">
                                 <img src=${info.authors[0].profile_picture} />
                                </div>
                                <div>
                                <h2 class""> ${info.title}</h2>
                                <p> ${info.authors[0].profile_name}
                                ${info.authors[0]?.verified ? '<i class="fa-solid fa-certificate"></i>' : ''}</p>
                                <p>${info.others.views}</p>
                             </div>
                            </div>
                            
                        </div>
                       
                        
                      
                    </div>
                `;
            cardcontainer.appendChild(div);
            

        });
    }
}
handlesearch();
clickhandler("1000")
const blogcontainer = () => {
    window.open(href = "./blog.html");
}



  




