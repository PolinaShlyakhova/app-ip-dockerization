function getIP() {
    const output = document.getElementById('output');
    const apiType = document.querySelector('input[name="api"]:checked').value;
    
    output.textContent = '{\n  "myIP": "загрузка..."\n}';
    
    if (apiType === 'ip-api') {
        fetch('http://ip-api.com/json/')
            .then(r => r.json())
            .then(data => {
                const result = { myIP: data.query };
                output.textContent = JSON.stringify(result, null, 2);
            })
            .catch(() => {
                output.textContent = JSON.stringify({myIP: null}, null, 2);
            });
    } else {        
        const script = document.createElement('script');
        script.id = 'jsonp-script';
        script.src = 'https://jsonip.com/?callback=handleJSONP';
        document.body.appendChild(script);

        window.handleJSONP = function(data) {
            const result = { myIP: data.ip };
            output.textContent = JSON.stringify(result, null, 2);
            document.getElementById('jsonp-script').remove();
        };
    }
}
