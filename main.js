const songsList = {
    ugh: 'https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/271789769&color=%23ff5500&auto_play=true&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true',
    angry: "https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/1257170524&color=%23323232&auto_play=true&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true",
    bored:
    'https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/399204039&color=%23323232&auto_play=true&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true',
    calm: 'https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/204375220&color=%23ff5500&auto_play=true&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true',
    happy:
    'https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/115841065&color=%23323232&auto_play=true&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true',
    hopeful: 'https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/254189022&color=%23323232&auto_play=true&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true',
    nervous:'https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/268361091&color=%23323232&auto_play=true&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true',
    proud:'https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/114294138&color=%23ff5500&auto_play=true&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true',
    sad: 'https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/327493288&color=%23ff5500&auto_play=true&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true',
    silly:'https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/329539356&color=%23ff5500&auto_play=true&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true',
    surprised:'https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/155240207&color=%23ff5500&auto_play=true&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true'
};



// const picKEY = 'h0c54IJh6THj1bLrBpN3r9eqkdm0RqiQ87VxBnEo0UE'
const picKEY ='_uKliwCeyxAFo8jI9y1twB6GeYVGyliFI0KysBlZvlk'

const apiURLMusic = `https://binaryjazz.us/wp-json/genrenator/v1/genre/1`

const musicForm = document.querySelector('.emotion__selector');
const section = document.querySelector(".container");


musicForm.addEventListener('submit', handleMusicSelector);

function handleMusicSelector(event) {
    event.preventDefault();

    const dropDownEmotion = document.getElementById('emotion__search');
    console.log(dropDownEmotion.value);

    switch(dropDownEmotion.value){
        case "angry":
            document.querySelector("body").style.color = "#ff0000";
            document.querySelector("body").style.backgroundColor = "#ff000020";

            break;

        case "bored":
            document.querySelector("body").style.color = "#664747";
            document.querySelector("body").style.backgroundColor = "#66474720";
            break;

        case "calm":
            document.querySelector("body").style.color = "#5fd0fd";
            document.querySelector("body").style.backgroundColor = "#5fd0fd20";
            break;

        case "happy":
            document.querySelector("body").style.color = "#fa7646";
            document.querySelector("body").style.backgroundColor = "#fa764620";
            break;    

        case "hopeful":
            document.querySelector("body").style.color = "#ecc800";
            document.querySelector("body").style.backgroundColor = "#ecc80020";
            break;
                
        case "nervous":
            document.querySelector("body").style.color = "#2F4F4F";
            document.querySelector("body").style.backgroundColor = "#2F4F4F20";
            break;

        case "proud":
            document.querySelector("body").style.color = "#008000";
            document.querySelector("body").style.backgroundColor = "#00800020";
            break;

        case "sad":
            document.querySelector("body").style.color = "#191970";
            document.querySelector("body").style.backgroundColor = "#19197020";
            break;

        case "silly":
            document.querySelector("body").style.color = "#C71585";
            document.querySelector("body").style.backgroundColor = "#C7158520";
            break;   

        case "surprised":
            document.querySelector("body").style.color = "#d43900";
            document.querySelector("body").style.backgroundColor = "#d4390020";
            break;       
            
    }

    const emotionValue = event.target.emotion.value;
    section.replaceChildren();

    const apiURLPic = `https://api.unsplash.com/photos/random/?client_id=${picKEY}&query=${emotionValue}&orientation=landscape`


    axios.get(apiURLPic).then(response => {
            const newImg = document.createElement('img');
            newImg.classList.add('emotion__img');
            const imageLink = response.data.urls.raw;
            newImg.setAttribute('src', imageLink);
            newImg.style.maxHeight = '20rem';
            section.appendChild(newImg);

            const newP = document.createElement('p');
            newP.classList.add('emotion__p');
            if (emotionValue === "ugh"){
                newP.innerText = `You are feeling 😶`;

            }
            else{
                newP.innerText = `You are feeling ${emotionValue}`;

            }
            section.appendChild(newP);

         

            axios.get(apiURLMusic).then(response => {
                const musicGenre = response.data;
                const genreP  = document.createElement('p');
                genreP.classList.add('genre__p');
                const output= generateUpperCase(musicGenre);
                genreP.innerText = `You should listen to: `;
                section.append(genreP);

                const genreSpan = document.createElement('p');
                genreSpan.classList.add('genre__span');
                genreSpan.innerText = ` ${output}`;
                genreP.appendChild(genreSpan);

                const soundcloud = document.querySelector('.soundcloud');
                soundcloud.setAttribute('src',songsList[dropDownEmotion.value]);

    
            })

        })
        .catch(err => {
            console.error(err);
        })
}

function generateUpperCase(name){
    let split = name.split(' ');
    for(let i=0; i<split.length; i++){
        split[i]= split[i].charAt(0).toUpperCase() + split[i].substring(1);
    }
    
    return split.join(' ');
}



