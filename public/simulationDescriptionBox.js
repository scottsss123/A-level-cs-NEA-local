class SimulationDescriptionBox extends TextBox {

    #linkedSimulationID;

    constructor(inX, inY, inWidth, inHeight) {
        super(inX, inY, inWidth, inHeight, "");
    }

    updateContents(simulationMetaData) {
        if (simulationMetaData === -1) {
            super.updateContents ("no simulation saved");
            this.#linkedSimulationID = -1;
            return;
        }

        let simulationName = simulationMetaData.Name;
        let simulationDescription = simulationMetaData.Description;
        let simulationID = simulationMetaData.SimulationID;
        this.#linkedSimulationID = simulationID;

        let out = simulationName + "\n" + simulationDescription + "\n" + simulationID;

        super.updateContents(out);
    }

    getSimulationID() {
        return this.#linkedSimulationID;
    }
}

