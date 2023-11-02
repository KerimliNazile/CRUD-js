const baseUrl = "https://northwind.vercel.app/api/products"
const dataTable = document.getElementById('data-table')


async function fetchData() {
    try {
        const response = await axios.get(baseUrl)
        addTable(response.data)
    } catch (error) {
        console.log(error);
    }
}

function addTable(data) {
    dataTable.innerHTML = ''
    data.forEach(item => {
        const row = document.createElement('tr')
        row.innerHTML = `
       
            <td>${item.id}</td>
            <td>${item.quantityPerUnit}</td>
            <td>${item.name}</td>
            <td>${item.discontinued}</td>
            <td>
            <button onclick="editPost(${item.id})">Edit</button>
            <button onclick="deletePost(${item.id})">Delete</button>
        </td>
        `
        dataTable.appendChild(row)
    });

}

async function createPost() {
    const quantityPerUnitInput = document.getElementById('quantity-input').value
    const discontinuedInput = document.getElementById('desc-input').value
    const nameInput = document.getElementById('name-input').value
    try {

        await axios.post(baseUrl, {
            quantityPerUnit: quantityPerUnitInput,
            discontinued: discontinuedInput,
            name: nameInput
        })
        fetchData()

    } catch (error) {
        console.log(error);
    }
}

let editPosdId = null

async function editPost(postId) {

    try {
        const response = await axios.get(`${baseUrl}/${postId}`)

        const post = response.data
        document.getElementById('quantity-input').value = post.quantityPerUnit
        document.getElementById('desc-input').value = post.city
        document.getElementById('name-input').value = post.name

        editPosdId = postId
    } catch (error) {
        console.log(error);
    }
}

async function updatePost() {
    const quantityPerUnitInput = document.getElementById('quantity-input').value
    const discontinuedInput = document.getElementById('desc-input').value
    const nameInput = document.getElementById('name-input').value
    if (editPosdId) {
        try {
            await axios.put(`${baseUrl}/${editPosdId}`, {
                quantityPerUnit: quantityPerUnitInput,
                discontinued: discontinuedInput,
                name: nameInput
            })
            fetchData()
        } catch (error) {
            console.log(error);
        }
    }

}


async function deletePost(postId) {
    try {

        await axios.delete(`${baseUrl}/${postId}`)
        fetchData()
    } catch (error) {
        console.log(error);
    }
}

fetchData()