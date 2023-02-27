import config from "./config.js"

const searchInputEl = document.querySelector("#input_area")
const imageDisplayEl = document.querySelector("#images")

searchInputEl.addEventListener('keypress', (eve)=> {
    if (eve.key === "Enter") {
        const prompt= searchInputEl.value


        fetch(`https://api.openai.com/v1/images/generations`,{
            method: 'POST',
            headers: {

                'Content-Type': `application/json`,
                'Authorization': `Bearer ${config.API_KEY}`,

            },
            body: JSON.stringify({

                prompt: prompt,
                n: 1,
                size: "1024x1024"

            })
        })
            .then(response => response.json())
            .then(data => {
                const picture = data;
                //const itemsInPage = picture.slice(0,1);
                imageDisplayEl.innerHTML = '';

                const dv = document.createElement('div')

                dv.classList.add('p-6', 'ml-6', 'border-2', 'bg-sky-200');
                dv.innerHTML = `

                <img src="${picture.data[0].url}"  alt="">

                `
                imageDisplayEl.appendChild(dv);

            })
    }

})
