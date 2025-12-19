// Абстрактный класс
class IPService {
    constructor() {
        if (this.constructor === IPService) {
            throw new Error("IPService - абстрактный класс, нельзя создавать его экземпляры");
        }
    }
    
    async getIP() {
        throw new Error("Абстрактный метод getIP() должен быть реализован в дочернем классе");
    }
}

// Реализация ip-api.com
class IpApiService extends IPService {
    async getIP() {
        try {
            const response = await fetch('http://ip-api.com/json/');
            const data = await response.json();
            return data.query; // У ip-api.com IP лежит в поле "query"
        } catch (error) {
            return null;
        }
    }
}

// Реализация jsonip.com
class JsonIpService extends IPService {
    async getIP() {
        return new Promise((resolve) => {
            const callbackName = 'jsonp_' + Date.now();
            const script = document.createElement('script');
            script.src = `https://jsonip.com/?callback=${callbackName}`;
            
            window[callbackName] = (data) => {
                delete window[callbackName];
                document.body.removeChild(script);
                resolve(data.ip); // У jsonip.com IP лежит в поле "ip"
            };
            
            script.onerror = () => {
                delete window[callbackName];
                if (script.parentNode) document.body.removeChild(script);
                resolve(null);
            };
            
            document.body.appendChild(script);
        });
    }
}

async function getIP() {
    const output = document.getElementById('output');
    const apiType = document.querySelector('input[name="api"]:checked').value;
    
    output.textContent = '{\n  "myIP": "загрузка..."\n}';
    let service;

    if (apiType === 'ip-api') {
        service = new IpApiService();
    } else {
        service = new JsonIpService();
    }
    
    const ip = await service.getIP();
    output.textContent = JSON.stringify({ myIP: ip }, null, 2);
}
