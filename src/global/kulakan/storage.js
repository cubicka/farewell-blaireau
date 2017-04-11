function SaveState(name) {
    return (state) => {
        localStorage.setItem(name, JSON.stringify(state))
        return state
    }
}

function LoadState(name) {
    return () => {
        try {
            const state = JSON.parse(localStorage.getItem(name))
            return state
        } catch (e) {
            return null
        }
    }
}

function HasStorage() {
  const test = 'test'
  try {
    localStorage.setItem(test, test)
    localStorage.removeItem(test)
    return true
  } catch (e) {
    return false
  }
}

function StorageFn() {
    if (HasStorage()) {
        return {
            Save(name, val) {
                localStorage.setItem(name, val)
            },
            Load(name) {
                return localStorage.getItem(name)
            },
            State: (name) => ({
                Load: LoadState(name),
                Save: SaveState(name),
            })
        }
    }

    return () => ({
        Load: () => (null),
        Save: (x) => (x),
    })
}

const storage = StorageFn()

export default storage
