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
        }
      ],
      "faceSize": 1000,
      "initialViewParameters": {
        "pitch": 0,
        "yaw": 0,
        "fov": 1.5707963267948966
      },
      "linkHotspots": [
        {
          "yaw": 0.6211212348335415,
          "pitch": 0.0718215344087163,
          "rotation": 0,
          "target": "2-cucina"
        },
        {
          "yaw": -0.5173173284305168,
          "pitch": 0.07830735711648451,
          "rotation": 0,
          "target": "1-bagno"
        }
      ],
      "infoHotspots": []
    },
    {
      "id": "1-bagno",
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
        }
      ],
      "faceSize": 1000,
      "initialViewParameters": {
        "pitch": 0,
        "yaw": 0,
        "fov": 1.5707963267948966
      },
      "linkHotspots": [
        {
          "yaw": 0.6512784344757225,
          "pitch": 0.09639327449612978,
          "rotation": 0,
          "target": "0-ingresso"
        }
      ],
      "infoHotspots": []
    },
    {
      "id": "2-cucina",
      "name": "Cucina",
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
        }
      ],
      "faceSize": 1000,
      "initialViewParameters": {
        "pitch": 0,
        "yaw": 0,
        "fov": 1.5707963267948966
      },
      "linkHotspots": [
        {
          "yaw": 0.12590348995448863,
          "pitch": 0.09881218593060481,
          "rotation": 0,
          "target": "3-soggiorno"
        },
        {
          "yaw": -0.5152319099364959,
          "pitch": 0.08097906285753176,
          "rotation": 0,
          "target": "4-camera-da-letto"
        },
        {
          "yaw": 2.831722974843334,
          "pitch": 0.11750948299390984,
          "rotation": 0,
          "target": "0-ingresso"
        }
      ],
      "infoHotspots": []
    },
    {
      "id": "3-soggiorno",
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
        }
      ],
      "faceSize": 1000,
      "initialViewParameters": {
        "pitch": 0,
        "yaw": 0,
        "fov": 1.5707963267948966
      },
      "linkHotspots": [
        {
          "yaw": -0.031078098754319328,
          "pitch": 0.1192842305641797,
          "rotation": 0,
          "target": "2-cucina"
        },
        {
          "yaw": 1.4222235689457303,
          "pitch": 0.1432216190632225,
          "rotation": 0,
          "target": "4-camera-da-letto"
        }
      ],
      "infoHotspots": []
    },
    {
      "id": "4-camera-da-letto",
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
        }
      ],
      "faceSize": 1000,
      "initialViewParameters": {
        "pitch": 0,
        "yaw": 0,
        "fov": 1.5707963267948966
      },
      "linkHotspots": [
        {
          "yaw": -1.354604559141272,
          "pitch": 0.15440208488200113,
          "rotation": 0,
          "target": "3-soggiorno"
        }
      ],
      "infoHotspots": []
    }
  ],
  "name": "A12",
  "settings": {
    "mouseViewMode": "drag",
    "autorotateEnabled": false,
    "fullscreenButton": true,
    "viewControlButtons": false
  }
};
