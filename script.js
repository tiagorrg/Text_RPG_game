const characterStats = {
    health: 100,
    attack: 10,
    defense: 5,
    inventory: [
        {
            name: 'Regeneration Potion lvl 1',
            power: 10,
            function () {
                characterStats.health += this.power
                addLogText(`Вы используете зелье регенирации, ваше здоровье повышается на ${this.power}`)
            }
        }
    ]
}

const currentEnemy = {}

const locations = [
    {
        location: 'В данный момент вы находитесь в лесу. Вокруг вас растут деревья.',
        enemies: [
            {
                name: 'Goblin',
                attack: 10,
                health: 25
            },
            {
                name: 'Wolf',
                attack: 15,
                health: 15
            }
        ],
        items: [
            {
                name: 'Regeneration Potion lvl 1',
                power: 10,
                function () {
                    characterStats.health += this.power
                    addLogText(`Вы используете зелье регенирации, ваше здоровье повышается на ${this.power}`)
                }
            },
            {
                name: 'Shield lvl 2',
                power: 10,
                function () {
                    characterStats.defense += this.power
                    addLogText(`Вы экипируете щит', ваша защита с ним больше на ${this.power}`)
                }
            }
        ]
    },
    {
        location: 'Вы находитесь на вершине горы. Видно облака ниже вас.',
        enemies: [
            {
                name: 'Eagle',
                attack: 20,
                health: 30
            },
            {
                name: 'Mountain Lion',
                attack: 25,
                health: 20
            }
        ],
        items: [
            {
                name: 'Iron Sword',
                power: 10,
                function () {
                    characterStats.attack += this.power
                    addLogText(`Вы экипируете железный меч, с ним ваш урон больше на ${this.power}`)
                }
            },
            {
                name: 'Regeneration Potion lvl 2',
                power: 20,
                function () {
                    characterStats.health += this.power
                    addLogText(`Вы используете зелье регенирации, ваше здоровье повышается на ${this.power}`)
                }
            }
        ]
    },
    {
        location: 'Вы на корабле, плавающем по бурному морю.',
        enemies: [
            {
                name: 'Pirate',
                attack: 30,
                health: 20
            },
            {
                name: 'Sea Monster',
                attack: 40,
                health: 50
            }
        ],
        items: [
            {
                name: 'Life Jacket',
                power: 5,
                function () {
                    characterStats.defense += this.power
                    addLogText(`Вы экипируете спасательный желет, с ним ваша защита больше на ${this.power}`)
                }
            },
            {
                name: 'Rum',
                power: 5,
                function () {
                    characterStats.attack += this.power
                    addLogText(`Вы выпиваете до дна ром, вас переполняет сила, атака увеличена на ${this.power}`)
                }
            }
        ]
    },
    {
        location: 'Вы на заснеженном горном плато. Ветер сильно воет.',
        enemies: [
            {
                name: 'Yeti',
                attack: 60,
                health: 70
            },
            {
                name: 'Ice Elemental',
                attack: 65,
                health: 75
            }
        ],
        items: [
            {
                name: 'Warmth Amulet',
                power: 10,
                function () {
                    characterStats.health += this.power
                    addLogText(`Вы одеваете амулет тепла, с ним ваше здоровье больше на ${this.power}`)
                }
            },
            {
                name: 'Felt boots',
                power: 15,
                function () {
                    characterStats.defense += this.power
                    addLogText(`Вы экипируете валенки, с ними ваша защита больше аж на ${this.power}`)
                }
            }
        ]
    }   
]

let explorePossibility = true

const currentLocation = {
    location: 'В данный момент вы находитесь в лесу. Вокруг вас растут деревья.',
    enemies: [
        {
            name: 'Goblin',
            attack: 10,
            health: 25
        },
        {
            name: 'Wolf',
            attack: 15,
            health: 15
        },
        {
            name: 'Nobody'
        }
    ],
    items: [
        {
            name: 'Regeneration Potion lvl 1',
            power: 10,
            function () {
                characterStats.health += this.power
                addLogText(`Вы используете зелье регенирации, ваше здоровье повышается на ${this.power}`)
            }
        },
        {
            name: 'Shield lvl 1',
            power: 10,
            function () {
                characterStats.defense += this.power
                addLogText(`Вы экипируете щит, с ним ваша защита больше на ${this.power}`)
            }
        }
    ]
}

const selectRandomEvent = (array) => {
    const quantity = array.length

    return Math.floor(Math.random() * (quantity))
}

const selectCharacterName = () => {
    let characterName = prompt('Введите желаемое имя персонажа')

    const containerCharacterName = document.getElementsByClassName('js-character-name')[0]
    containerCharacterName.innerHTML = characterName
}

const updateInventoryInfo = (characterStats) => {
    const itemsInInventory = characterStats.inventory
    const characterInventory = document.getElementsByClassName('js-character-inventory')[0]
    characterInventory.innerHTML = ''
    const itemsButtonWrapper = document.createElement('div')

    itemsInInventory.forEach(item => {
        const createButtonItem = document.createElement('button')
        createButtonItem.innerHTML = item.name
        
        createButtonItem.addEventListener('click', () => {
            item.function.call(item)

            delete itemsInInventory[itemsInInventory.indexOf(item)]

            updateCharacterInfo(characterStats)
            updateInventoryInfo(characterStats)
        })
        itemsButtonWrapper.appendChild(createButtonItem)
    });

    characterInventory.appendChild(itemsButtonWrapper)
}

const updateCharacterInfo = (characterStats) => {
    if (characterStats.health <= 0) {
        const characterHealth = document.getElementsByClassName('js-character-health')[0]
        characterHealth.innerHTML = `Health: 0`

        addLogText('Вы погибли')
        alert('К сожалению ваш персонаж погиб')

        var buttons = document.getElementsByTagName("button");
        for (var i = 0; i < buttons.length; i++) {
            buttons[i].disabled = true;
            buttons[i].classList.add( 'disabled')
        }

        return
    }

    const characterHealth = document.getElementsByClassName('js-character-health')[0]
    characterHealth.innerHTML = `Health: ${characterStats.health}`

    const characterAttack = document.getElementsByClassName('js-character-attack')[0]
    characterAttack.innerHTML = `Attack: ${characterStats.attack}`

    const characterDefense = document.getElementsByClassName('js-character-defense')[0]
    characterDefense.innerHTML = `Defense: ${characterStats.defense}`

    updateInventoryInfo(characterStats)
}

const setCurrentLocation = (locations) => {
    const currentLocation = document.getElementsByClassName('js-location-name')[0]

    currentLocation.innerHTML = locations[selectRandomEvent(locations)].location
}

const setStartLocation = (startLocation) => {
    const currentLocation = document.getElementsByClassName('js-location-name')[0]

    currentLocation.innerHTML = startLocation.location

    spawnEnemy(startLocation.enemies)
}

const spawnEnemy = (enemies) => {
    const enemy = enemies[selectRandomEvent(enemies)]

    const {name, health, attack} = enemy

    addLogText(`Перед тобой появляется ${name} со здоровьем ${health} и уроном ${attack}`)

    currentEnemy.name = name
    currentEnemy.attack = attack
    currentEnemy.health = health
}

const addLogText = (text) => {
    const containerLog = document.getElementById('log')

    containerLog.innerHTML += `<p>${text}</p>`

    containerLog.scrollTo(0, containerLog.scrollHeight)
}

const takeStartInfo = (characterStats) => {
    selectCharacterName()
    updateCharacterInfo(characterStats)
    setStartLocation(locations[0])
}

const getItem = (characterStats, foundItem) => {
    if (explorePossibility && !currentEnemy.name) {
        characterStats.inventory.push(foundItem)

        addLogText('Вы подобрали предмет')
        updateInventoryInfo(characterStats)

        if (collectBtnListener) {
            document.getElementsByClassName('js-collect-btn')[0].removeEventListener('click', collectBtnListener);
            collectBtnListener = null;
        }

        explorePossibility = false
        return
    }

    addLogText('Вы не можете взять предмет')
}

const changeCurrentLocation = (locations) => {
    const newCurrentLocation = locations[selectRandomEvent(locations)]

    Object.keys(currentLocation).forEach(key => {
        currentLocation[key] = newCurrentLocation[key]
    })

    explorePossibility = true

    setStartLocation(currentLocation)
}

document.getElementsByClassName('js-explore-btn')[0].addEventListener('click', () => {
    if (currentEnemy.name){
        addLogText('Перед вами противник, исследовать локацию не получится')
        return
    }

    if (!explorePossibility){
        characterStats.health -= 5
        addLogText('Больше ничего найти не удается. Вы впустую тратите время и теряете 5 единиц здоровья')
        updateCharacterInfo(characterStats)
        return
    }

    const foundItem = currentLocation.items[selectRandomEvent(currentLocation.items)]

    addLogText(`Вы нашли ${foundItem.name}. Хотите взять?`)
    
    collectBtnListener = () => getItem(characterStats, foundItem);
    document.getElementsByClassName('js-collect-btn')[0].addEventListener('click', collectBtnListener)
})

document.getElementsByClassName('js-fight-btn')[0].addEventListener('click', () => {
    if (!currentEnemy.name){
        addLogText('Атаковать некого')
        return
    }

    if (currentEnemy.health > 0){
        currentEnemy.health = currentEnemy.health - characterStats.attack
        addLogText(`Вы атакуете ${currentEnemy.name} на ${characterStats.attack}, его здоровье становится ${currentEnemy.health > 0 ? currentEnemy.health : 0}`)
    }

    if (currentEnemy.health <= 0){
        addLogText(`${currentEnemy.name} мертв`)

        Object.keys(currentEnemy).forEach(key => delete currentEnemy[key])

        return
    }

    characterStats.health = characterStats.health - currentEnemy.attack + characterStats.defense
    updateCharacterInfo(characterStats)
    addLogText(`${currentEnemy.name} атакует вас на ${currentEnemy.attack}, но вы беспоследственно поглатили ${characterStats.defense}`)
})

document.getElementsByClassName('js-escape-btn')[0].addEventListener('click', () => {
    if (currentEnemy.name){
        switch (selectRandomEvent([0, 1, 2, 3])) {
            case 0 : {
                addLogText('Перед вами противник, вам не удалось сбежать, и вы теряете 5 единиц здоровья')

                characterStats.health -= 5
                break
            }
            case 1 : {
                addLogText('Перед вами противник, вам не удалось сбежать, и вы теряете 10 единиц здоровья')

                characterStats.health -= 10
                break
            }
            case 2 : {
                addLogText('Перед вами противник, вам не удалось сбежать, и вы теряете 15 единиц здоровья')

                characterStats.health -= 15
                break
            }
            case 3 : {
                addLogText('Перед вами противник, вам удалось сбежать, но вы теряете 15 единиц здоровья')

                characterStats.health -= 15

                changeCurrentLocation(locations)
                break
            }
        }
        updateCharacterInfo(characterStats)
        explorePossibility = true
        return
    }

    if (collectBtnListener) {
        document.getElementsByClassName('js-collect-btn')[0].removeEventListener('click', collectBtnListener);
        collectBtnListener = null;
    }

    changeCurrentLocation(locations)
})

takeStartInfo(characterStats)