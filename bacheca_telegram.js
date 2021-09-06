[
    {
        "id": "868102bd.53f41",
        "type": "subflow",
        "name": "Token Scuola Viva",
        "info": "",
        "category": "",
        "in": [
            {
                "x": 260,
                "y": 120,
                "wires": [
                    {
                        "id": "bb37ca1c.4c1c58"
                    }
                ]
            }
        ],
        "out": [
            {
                "x": 1220,
                "y": 120,
                "wires": [
                    {
                        "id": "8e431df8.3192f",
                        "port": 0
                    }
                ]
            }
        ],
        "env": [],
        "meta": {},
        "color": "#DDAA99"
    },
    {
        "id": "bb37ca1c.4c1c58",
        "type": "credentials",
        "z": "868102bd.53f41",
        "name": "ClasseViva Dati Accesso",
        "props": [
            {
                "value": "username_scuola_viva",
                "type": "msg"
            },
            {
                "value": "pws_scuola_viva",
                "type": "msg"
            },
            {
                "value": "end_point",
                "type": "msg"
            },
            {
                "value": "ident",
                "type": "msg"
            },
            {
                "value": "id_student",
                "type": "msg"
            }
        ],
        "x": 470,
        "y": 120,
        "wires": [
            [
                "97317344.f44af"
            ]
        ]
    },
    {
        "id": "8e431df8.3192f",
        "type": "http request",
        "z": "868102bd.53f41",
        "name": "",
        "method": "use",
        "ret": "txt",
        "paytoqs": "ignore",
        "url": "",
        "tls": "",
        "persist": false,
        "proxy": "",
        "authType": "",
        "x": 1010,
        "y": 160,
        "wires": [
            []
        ]
    },
    {
        "id": "97317344.f44af",
        "type": "function",
        "z": "868102bd.53f41",
        "name": "Login  e set Global",
        "func": "var result=msg.payload\nvar username\nvar password\nvar endpoint\nvar ident\nvar url\nvar id_student\n\nusername = msg.username_scuola_viva;\npassword = msg.pws_scuola_viva;\nendpoint = msg.end_point\nident = msg.ident\nid_student = msg.id_student\n\nglobal.set(\"id_student\",id_student)\nglobal.set(\"endpoint_classeviva\", endpoint)\n\n\nurl = endpoint+\"/auth/login\"\nvar data = {\"ident\": null,\"pass\":password,\"uid\":username,\"ident\":ident};\nvar msg = {\n\t\"method\" : \"POST\",\n\t\"url\" : url,\n\t\"headers\" : {\n\t\t\"Content-Type\": \"application/json\",\n\t\t\"Z-Dev-ApiKey\": \"+zorro+\",\n\t\t\"User-Agent\":\"zorro/1.0\"\n\t},\n\t\"payload\" : JSON.stringify(data)\n};\n\nreturn msg;\n",
        "outputs": 1,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 800,
        "y": 100,
        "wires": [
            [
                "8e431df8.3192f"
            ]
        ]
    },
    {
        "id": "1e6cf291.16829d",
        "type": "tab",
        "label": "ScuolaViva",
        "disabled": false,
        "info": ""
    },
    {
        "id": "57639170.e19aa",
        "type": "inject",
        "z": "1e6cf291.16829d",
        "name": "Ogni 30 minuti verifico Notizie",
        "props": [
            {
                "p": "payload"
            },
            {
                "p": "topic",
                "vt": "str"
            }
        ],
        "repeat": "1800",
        "crontab": "",
        "once": false,
        "onceDelay": 0.1,
        "topic": "",
        "payload": "",
        "payloadType": "date",
        "x": 210,
        "y": 80,
        "wires": [
            [
                "37d59a41.5d66d6"
            ]
        ]
    },
    {
        "id": "37d59a41.5d66d6",
        "type": "subflow:868102bd.53f41",
        "z": "1e6cf291.16829d",
        "name": "",
        "env": [],
        "x": 470,
        "y": 60,
        "wires": [
            [
                "7865e61a.b24de8"
            ]
        ]
    },
    {
        "id": "d2ba16c3.de2e88",
        "type": "http request",
        "z": "1e6cf291.16829d",
        "name": "Richiesta Documento Binario",
        "method": "use",
        "ret": "txt",
        "paytoqs": "ignore",
        "url": "",
        "tls": "",
        "persist": false,
        "proxy": "",
        "authType": "",
        "x": 1180,
        "y": 100,
        "wires": [
            [
                "ad1df993.193648"
            ]
        ]
    },
    {
        "id": "87ffa777.08ec68",
        "type": "function",
        "z": "1e6cf291.16829d",
        "name": "Crea Richiesta Notice Board ",
        "func": "var result=msg.payload\nvar token\nvar id_student = global.get(\"id_student\")\nvar endpoint =global.get(\"endpoint_classeviva\")\ntoken = msg.payload.token;\nglobal.set(\"token_classeviva\",token)\n\nurl = endpoint+\"/students/\"+id_student+\"/noticeboard\"\nvar msg = {\n\t\"method\" : \"GET\",\n\t\"url\" : url,\n\t\"headers\" : {\n\t\t\"Content-Type\": \"application/json\",\n\t\t\"Z-Dev-ApiKey\": \"+zorro+\",\n\t\t\"User-Agent\":\"zorro/1.0\",\n\t\t\"Z-Auth-Token\":token\n\t}\n};\n\nreturn msg;\n",
        "outputs": 1,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 900,
        "y": 60,
        "wires": [
            [
                "d2ba16c3.de2e88"
            ]
        ]
    },
    {
        "id": "7865e61a.b24de8",
        "type": "json",
        "z": "1e6cf291.16829d",
        "name": "",
        "property": "payload",
        "action": "",
        "pretty": false,
        "x": 670,
        "y": 60,
        "wires": [
            [
                "87ffa777.08ec68"
            ]
        ]
    },
    {
        "id": "8b114286.57615",
        "type": "function",
        "z": "1e6cf291.16829d",
        "name": "Post notizia letta",
        "func": "var contatore=global.get(\"il27dc7d01da9fc2\");\nvar elenco_news=global.get(\"bacheca_classeviva\");\nvar result=elenco_news.items[contatore]\nvar id_student = global.get(\"id_student\")\nvar endpoint =global.get(\"endpoint_classeviva\")\nvar token = global.get(\"token_classeviva\");\nglobal.set(\"notizia_classeviva\",result)\n\nurl = endpoint+\"/students/\"+id_student+\"/noticeboard/read/\"+result.evtCode+\"/\"+result.pubId+\"/101\"\nvar msg = {\n\t\"method\" : \"POST\",\n\t\"url\" : url,\n\t\"headers\" : {\n\t\t\"Content-Type\": \"application/json\",\n\t\t\"Z-Dev-ApiKey\": \"+zorro+\",\n\t\t\"User-Agent\":\"zorro/1.0\",\n\t\t\"Z-Auth-Token\":token\n\t}\n};\n\nreturn msg;\n",
        "outputs": 1,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 2010,
        "y": 60,
        "wires": [
            [
                "a19de804.20e5b8"
            ]
        ]
    },
    {
        "id": "a6ef7c12.ee477",
        "type": "http request",
        "z": "1e6cf291.16829d",
        "name": "",
        "method": "use",
        "ret": "bin",
        "paytoqs": "ignore",
        "url": "",
        "tls": "",
        "persist": false,
        "proxy": "",
        "authType": "",
        "x": 2470,
        "y": 160,
        "wires": [
            [
                "563b1fd4.1b494"
            ]
        ]
    },
    {
        "id": "990044a9.db1de8",
        "type": "telegram sender",
        "z": "1e6cf291.16829d",
        "name": "Invio News con Allegato",
        "bot": "430150e9.b1ade8",
        "haserroroutput": false,
        "outputs": 1,
        "x": 2210,
        "y": 300,
        "wires": [
            [
                "27dc7d01.da9fc2"
            ]
        ]
    },
    {
        "id": "563b1fd4.1b494",
        "type": "function",
        "z": "1e6cf291.16829d",
        "name": "Invio Notifica news con allegato",
        "func": "var result=msg.payload\nvar messaggio_classeviva = global.get(\"notizia_classeviva\")\nmsg.payload = {}    \nmsg.payload.chatId = ['1174325144','1952414961']\nmsg.payload.type = \"document\"\nmsg.payload.content = result\nmsg.payload.caption=\"Scuola: \" + messaggio_classeviva.cntTitle\n\nreturn msg;",
        "outputs": 1,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1890,
        "y": 280,
        "wires": [
            [
                "990044a9.db1de8"
            ]
        ]
    },
    {
        "id": "ad1df993.193648",
        "type": "json",
        "z": "1e6cf291.16829d",
        "name": "",
        "property": "payload",
        "action": "obj",
        "pretty": false,
        "x": 1310,
        "y": 300,
        "wires": [
            [
                "7929c514.9085fc"
            ]
        ]
    },
    {
        "id": "e2eaff52.fd02",
        "type": "switch",
        "z": "1e6cf291.16829d",
        "name": "",
        "property": "$globalContext(\"bacheca_classeviva\").items[$globalContext(\"il27dc7d01da9fc2\")].readStatus",
        "propertyType": "jsonata",
        "rules": [
            {
                "t": "false"
            },
            {
                "t": "true"
            }
        ],
        "checkall": "true",
        "repair": false,
        "outputs": 2,
        "x": 1790,
        "y": 40,
        "wires": [
            [
                "8b114286.57615"
            ],
            [
                "27dc7d01.da9fc2"
            ]
        ]
    },
    {
        "id": "a19de804.20e5b8",
        "type": "http request",
        "z": "1e6cf291.16829d",
        "name": "",
        "method": "use",
        "ret": "txt",
        "paytoqs": "ignore",
        "url": "",
        "tls": "",
        "persist": false,
        "proxy": "",
        "authType": "",
        "x": 2210,
        "y": 80,
        "wires": [
            [
                "7a34a82b.a004a8"
            ]
        ]
    },
    {
        "id": "7a34a82b.a004a8",
        "type": "function",
        "z": "1e6cf291.16829d",
        "name": "Get Documento",
        "func": "var result=global.get(\"notizia_classeviva\")\nvar id_student = global.get(\"id_student\")\nvar endpoint =global.get(\"endpoint_classeviva\")\nvar token = global.get(\"token_classeviva\");\n\n\nurl = endpoint+\"/students/\"+id_student+\"/noticeboard/attach/\"+result.evtCode+\"/\"+result.pubId+\"/101\"\nvar msg = {\n\t\"method\" : \"GET\",\n\t\"url\" : url,\n\t\"headers\" : {\n\t\t\"Content-Type\": \"application/json\",\n\t\t\"Z-Dev-ApiKey\": \"+zorro+\",\n\t\t\"User-Agent\":\"zorro/1.0\",\n\t\t\"Z-Auth-Token\":token\n\t}\n};\n\nreturn msg;\n",
        "outputs": 1,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 2400,
        "y": 80,
        "wires": [
            [
                "a6ef7c12.ee477"
            ]
        ]
    },
    {
        "id": "7929c514.9085fc",
        "type": "function",
        "z": "1e6cf291.16829d",
        "name": "preserve array",
        "func": "global.set(\"bacheca_classeviva\",msg.payload)\nglobal.set(\"cont_notizie_scuola\",msg.payload.items.length-1)\nglobal.set(\"il27dc7d01da9fc2\",0)\nreturn msg;",
        "outputs": 1,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1440,
        "y": 220,
        "wires": [
            [
                "27dc7d01.da9fc2"
            ]
        ]
    },
    {
        "id": "27dc7d01.da9fc2",
        "type": "counter-loop",
        "z": "1e6cf291.16829d",
        "name": "Ciclo",
        "counter": "il27dc7d01da9fc2",
        "counterType": "global",
        "reset": false,
        "resetValue": "value-null",
        "initial": 0,
        "initialType": "num",
        "operator": "lte",
        "termination": "cont_notizie_scuola",
        "terminationType": "global",
        "increment": 1,
        "incrementType": "num",
        "x": 1630,
        "y": 100,
        "wires": [
            [],
            [
                "e2eaff52.fd02"
            ]
        ]
    },
    {
        "id": "430150e9.b1ade8",
        "type": "telegram bot",
        "botname": "Jarvis",
        "usernames": "",
        "chatids": "",
        "baseapiurl": "",
        "updatemode": "polling",
        "pollinterval": "300",
        "usesocks": false,
        "sockshost": "",
        "socksport": "6667",
        "socksusername": "anonymous",
        "sockspassword": "",
        "bothost": "",
        "botpath": "",
        "localbotport": "8443",
        "publicbotport": "8443",
        "privatekey": "",
        "certificate": "",
        "useselfsignedcertificate": false,
        "sslterminated": false,
        "verboselogging": false
    }
]
