var APP_DATA = {
  "scenes": [
    {
      "id": "0-ingresso",
      "name": "Ingresso",
      "levels": [
        {
          "tileSize": 256,
          "size": 256,
          "fallbackOnly": true
        },
        {
          "tileSize": 512,
          "size": 512
        },
        {
          "tileSize": 512,
          "size": 1024
        },
        {
          "tileSize": 512,
          "size": 2048
        }
      ],
      "faceSize": 2000,
      "initialViewParameters": {
        "pitch": 0,
        "yaw": 0,
        "fov": 1.5707963267948966
      },
      "linkHotspots": [
        {
          "yaw": 0.20790671867645294,
          "pitch": 0.010863364918897389,
          "rotation": 0,
          "target": "1-soggiorno"
        },
        {
          "yaw": -0.3115018531894158,
          "pitch": 0.052793703315085594,
          "rotation": 0,
          "target": "2-disimpegno"
        }
      ],
      "infoHotspots": []
    },
    {
      "id": "1-soggiorno",
      "name": "Soggiorno",
      "levels": [
        {
          "tileSize": 256,
          "size": 256,
          "fallbackOnly": true
        },
        {
          "tileSize": 512,
          "size": 512
        },
        {
          "tileSize": 512,
          "size": 1024
        },
        {
          "tileSize": 512,
          "size": 2048
        }
      ],
      "faceSize": 2000,
      "initialViewParameters": {
        "pitch": 0,
        "yaw": 0,
        "fov": 1.5707963267948966
      },
      "linkHotspots": [
        {
          "yaw": 0.23957265494896518,
          "pitch": 0.04096308518699843,
          "rotation": 0,
          "target": "0-ingresso"
        },
        {
          "yaw": 0.4615733909787352,
          "pitch": 0.04172800901387674,
          "rotation": 0,
          "target": "2-disimpegno"
        }
      ],
      "infoHotspots": []
    },
    {
      "id": "2-disimpegno",
      "name": "Disimpegno",
      "levels": [
        {
          "tileSize": 256,
          "size": 256,
          "fallbackOnly": true
        },
        {
          "tileSize": 512,
          "size": 512
        },
        {
          "tileSize": 512,
          "size": 1024
        },
        {
          "tileSize": 512,
          "size": 2048
        }
      ],
      "faceSize": 2000,
      "initialViewParameters": {
        "pitch": 0,
        "yaw": 0,
        "fov": 1.5707963267948966
      },
      "linkHotspots": [
        {
          "yaw": 0.2973544981411873,
          "pitch": 0.044556188916381245,
          "rotation": 0,
          "target": "3-camera-da-letto"
        },
        {
          "yaw": -0.5219322756385711,
          "pitch": 0.08640593970217658,
          "rotation": 0,
          "target": "4-bagno"
        }
      ],
      "infoHotspots": []
    },
    {
      "id": "3-camera-da-letto",
      "name": "Camera da letto",
      "levels": [
        {
          "tileSize": 256,
          "size": 256,
          "fallbackOnly": true
        },
        {
          "tileSize": 512,
          "size": 512
        },
        {
          "tileSize": 512,
          "size": 1024
        },
        {
          "tileSize": 512,
          "size": 2048
        }
      ],
      "faceSize": 2000,
      "initialViewParameters": {
        "pitch": 0,
        "yaw": 0,
        "fov": 1.5707963267948966
      },
      "linkHotspots": [
        {
          "yaw": 3.0028505756929755,
          "pitch": 0.1554305054673648,
          "rotation": 0,
          "target": "2-disimpegno"
        },
        {
          "yaw": -2.5770501425671455,
          "pitch": 0.10857950776231284,
          "rotation": 0,
          "target": "4-bagno"
        }
      ],
      "infoHotspots": []
    },
    {
      "id": "4-bagno",
      "name": "Bagno",
      "levels": [
        {
          "tileSize": 256,
          "size": 256,
          "fallbackOnly": true
        },
        {
          "tileSize": 512,
          "size": 512
        },
        {
          "tileSize": 512,
          "size": 1024
        },
        {
          "tileSize": 512,
          "size": 2048
        }
      ],
      "faceSize": 2000,
      "initialViewParameters": {
        "pitch": 0,
        "yaw": 0,
        "fov": 1.5707963267948966
      },
      "linkHotspots": [
        {
          "yaw": 0.44896356723610786,
          "pitch": 0.06689173569719564,
          "rotation": 0,
          "target": "2-disimpegno"
        }
      ],
      "infoHotspots": []
    }
  ],
  "name": "B24",
  "settings": {
    "mouseViewMode": "drag",
    "autorotateEnabled": false,
    "fullscreenButton": true,
    "viewControlButtons": false
  }
};
