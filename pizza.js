document.addEventListener('DOMContentLoaded', function () {
    const insertButton = document.getElementById('create');
    const readButton = document.getElementById('read');
    const updateButton = document.getElementById('update');
    const deleteButton = document.getElementById('delete');
    const vevokForm = document.getElementById('vevokForm');

    insertButton.addEventListener('click', async function () {
        let vnevInput = document.getElementById('vnev');
        let vcimInput = document.getElementById('vcim');
    
        if (vnevInput.value.trim() === '' || vcimInput.value.trim() === '') {
            alert('A Név és a Lakcím mezők kitöltése kötelező!');
            return; 
        }
    
        let baseUrl = "http://localhost/pizzabackend/index.php?vevo";
    
        const formData = new FormData(vevokForm);
        let options = {
            method: 'POST',
            body: formData
        };
    
        try {
            let response = await fetch(baseUrl, options);
            
            if (response.ok) {
                console.log("Sikeres adatfelvitel");
                alert('Sikeres hozzáadás!');
                window.location.reload(); 
            } else {
                console.error('Hiba a szerver válaszában');
            }
        } catch (error) {
            console.error('Hálózati hiba:', error);
        }
    });
    
    readButton.addEventListener('click', async function () {
        let baseUrl = "http://localhost/pizzabackend/index.php?vevo";
    
        try {
            let response = await fetch(baseUrl);
            if (!response.ok) {
                throw new Error('Hiba a szerver válaszában');
            }
    
            let data = await response.json();
            displayCustomers(data);
        } catch (error) {
            console.error('Hálózati hiba:', error);
        }
    });
    
    function displayCustomers(customers) {
        let customerList = document.getElementById('ugyfellista');
        customerList.innerHTML = '';
    
        customers.forEach(customer => {
            let listItem = document.createElement('div');
            listItem.classList.add('customer-item');
            listItem.style.textAlign = 'center';
            listItem.style.marginTop = '50px';
            listItem.style.border = '2px solid white';
    
            let vnev = document.createElement('h3');
            vnev.textContent = `Név: ${customer.vnev}`;
    
            let vcim = document.createElement('p');
            vcim.textContent = `Lakcím: ${customer.vcim}`;
    
            let updateButton = document.createElement('button');
            updateButton.textContent = 'Módosítás';
            updateButton.classList.add('btn', 'btn-warning');
            updateButton.addEventListener('click', function() {
                window.location.href = `update.html?vazon=${customer.vazon}`;
            });
    
            listItem.appendChild(vnev);
            listItem.appendChild(vcim);
            listItem.appendChild(updateButton);
    
            customerList.appendChild(listItem);
        });
    }
    

    updateButton.addEventListener('click', async function () {
        const ujVnevInput = document.getElementById('ujVnev');
        const ujVcimInput = document.getElementById('ujVcim');
    
    
        // Az URL összeállítása
        let baseUrl = "http://localhost/pizzabackend/index.php?vevo";
    
        // FormData objektum létrehozása és feltöltése az új név és lakcím adatokkal
        const formData = new FormData();
        formData.append('ujVnev', ujVnevInput.value);
        formData.append('ujVcim', ujVcimInput.value);
    
        // Kérés opcióinak beállítása
        let options = {
            method: 'PUT', // PUT metódus használata
            body: formData // A formData használata a kérés testében
        };
    
        try {
            // Fetch kérés végrehajtása
            let response = await fetch(baseUrl, options);
    
            // Válasz ellenőrzése
            if (response.ok) {
                console.log("Sikeres adatmódosítás");
                alert("Sikeres adatmódosítás"); // Értesítés megjelenítése
                window.location.href = 'index.html'; // Visszatérés az index.html oldalra
            } else {
                console.error('Hiba a szerver válaszában');
            }
        } catch (error) {
            console.error('Hálózati hiba:', error);
        }
    });
    
    

    deleteButton.addEventListener('click', async function () {
        // Implementáljuk az ügyfél törlését
    });
});
