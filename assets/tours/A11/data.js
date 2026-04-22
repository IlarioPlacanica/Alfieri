var APP_DATA = {
  "scenes": [
    {
      "id": "0-soggiorno",
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
          "yaw": 1.1107789077195385,
          "pitch": 0.012131133073603806,
          "rotation": 0,
          "target": "3-disimpegno"
        }
      ],
      "infoHotspots": []
    },
    {
      "id": "1-camera-da-letto",
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
          "yaw": -1.7658619319391153,
          "pitch": 0.028198021507714444,
          "rotation": 0,
          "target": "3-disimpegno"
        }
      ],
      "infoHotspots": []
    },
    {
      "id": "2-bagno",
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
          "yaw": -0.3821644988593782,
          "pitch": 0.055573109356696904,
          "rotation": 0,
          "target": "3-disimpegno"
        }
      ],
      "infoHotspots": []
    },
    {
      "id": "3-disimpegno",
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
          "yaw": -0.573484395213578,
          "pitch": 0.0853252145650707,
          "rotation": 0,
          "target": "0-soggiorno"
        },
        {
          "yaw": 0.7155887592282024,
          "pitch": 0.08409921970321221,
          "rotation": 0,
          "target": "1-camera-da-letto"
        },
        {
          "yaw": 2.274302037355451,
          "pitch": 0.09556729511729145,
          "rotation": 0,
          "target": "2-bagno"
        }
      ],
      "infoHotspots": []
    }
  ],
  "name": "A11",
  "settings": {
    "mouseViewMode": "drag",
    "autorotateEnabled": false,
    "fullscreenButton": true,
    "viewControlButtons": false
  }
};
