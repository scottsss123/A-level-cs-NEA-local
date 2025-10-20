class SimulationDescriptionBox extends TextBox {

    constructor(inX, inY, inWidth, inHeight) {
        super(inX, inY, inWidth, inHeight, "");
    }

    updateContents(simulationMetaData) {
        if (simulationMetaData === -1) {
            super.updateContents ("no simulation saved");
            return;
        }

        let simulationName = simulationMetaData.Name;
        let simulationDescription = simulationMetaData.Description;
        let simulationID = simulationMetaData.SimulationID;

        let out = simulationName + "\n" + simulationDescription + "\n" + simulationID;

        super.updateContents(out);
    }
}

