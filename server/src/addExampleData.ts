import { readFileSync } from 'fs';
import sequelize from './config/database.js';
import { Event, Resource } from './models/index';

async function setupDatabase() {
    // Wait for all models to synchronize with the database
    await sequelize.sync();

    await addExampleData();
}

async function addExampleData() {
    try {
    // Read and parse the JSON data
        const resourcesData = JSON.parse(
            readFileSync('./src/initialData/resources.json', 'utf-8')
        );
        const eventsData = JSON.parse(
            readFileSync('./src/initialData/events.json', 'utf-8')
        );

        await sequelize.transaction(async(t) => {
            const resources = await Resource.bulkCreate(resourcesData, {
                transaction : t
            });
            const events = await Event.bulkCreate(eventsData, { transaction : t });
            return { resources, events };
        });

        console.log('resources and events added to database successfully.');
    }
    catch (error) {
        console.error('Failed to add data to database due to an error: ', error);
    }
}

setupDatabase();
