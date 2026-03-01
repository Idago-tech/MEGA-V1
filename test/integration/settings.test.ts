import { strict as assert } from 'assert';
import fs from 'fs';
import path from 'path';

const DATA_DIR = path.join(process.cwd(), 'data');

describe('Settings Persistence', () => {

    let store: any;

    before(async () => {
        const mod = await import('../../lib/lightweight_store.js');
        store = mod.default;
    });

    const globalSettings = [
        'autoStatus', 'autoread', 'autotyping', 
        'pmblocker', 'anticall', 'stealthMode', 
        'autoBio', 'autoReaction'
    ];

    for (const key of globalSettings) {
        it(`should save and read ${key} correctly`, async () => {
            await store.saveSetting('global', key, { enabled: true });
            const val = await store.getSetting('global', key);
            assert.strictEqual(val?.enabled, true, `${key} should be true`);

            await store.saveSetting('global', key, { enabled: false });
            const val2 = await store.getSetting('global', key);
            assert.strictEqual(val2?.enabled, false, `${key} should be false`);

            // Verify file format is flat
            const filePath = path.join(DATA_DIR, `${key}.json`);
            if (fs.existsSync(filePath)) {
                const raw = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
                assert.ok(!('global' in raw), `${key}.json should not have 'global' wrapper`);
                assert.ok('enabled' in raw, `${key}.json should have flat 'enabled' key`);
            }
        });
    }
});
