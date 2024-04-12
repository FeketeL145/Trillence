function Settings(){
    const handleFileChange = (event) => {
        const output = document.getElementById("listing");
        output.innerHTML = ''; // Clear previous files
    
        const files = event.target.files;
    
        for (let i = 0; i < files.length; i++) {
          const file = files[i];
          const item = document.createElement("li");
          item.textContent = file.webkitRelativePath || file.name; // Use name if path is not available
          output.appendChild(item);
        }
      };
    
      const handleThemeChange = (event) => {
        // Add logic to handle theme change
        console.log("Selected theme:", event.target.value);
      };
    
    return(
        
        <div>
            {/*Ennek a témáját még nem csináltam meg, de a mai meg a holnapi nap folyamán megoldom*/}
            <div className='card m-5' >
                <form className="p-4">
                    <div className="row align-items-baseline">
                        <div className="col-lg-3">
                            <p className="text-start">Theme</p>
                        </div>
                        <div className="col">
                            <select className="m-2 rounded-8 form-select bg-dark" onChange={handleThemeChange}>
                            <option value="1" className="rounded-8">Light Theme</option>
                            <option value="2" className="rounded-8">Dark Theme</option>
                            <option value="3" className="rounded-8">Automatic</option>
                            </select>
                        </div>
                    </div>
                    <div className="row">
                        <input type="file" className="m-2 form-control rounded-8 bg-dark" id="inputGroupFile04" onChange={handleFileChange}/>
                    </div>
                </form>
            </div>
        </div>
    
    )
}
export default Settings;