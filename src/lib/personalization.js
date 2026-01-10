import { getAccessToken } from "./auth"
import { envs } from "./constants"


const CustomValueFieldType = Object.freeze({
    FILE: 'file',
    PRIMITIVE: 'primitive',
});


class CustomValue {
    /** @type {String} */
    uid;
    /** @type {String} */
    name;
    /** @type {String} */
    field_type;
    /** @type {String} */
    value;
    /** @type {String} */
    media_type;
    /** @type {String} */
    file_name;

    constructor({ uid, name, field_type, value, media_type, file_name }) {
        if (name === undefined) {
            throw new TypeError('Paramter "name" is required and has to be a String');
        }
        if (field_type === undefined) {
            throw new TypeError('Paramter "field_type" is required and has to be a String');
        }
        if (value === undefined) {
            throw new TypeError('Paramter "value" is required and has to be a String');
        }

        this.uid = uid;
        this.name = name;
        this.field_type = field_type;
        this.value = value;

        this.media_type = media_type || null;
        this.file_name = file_name || null;
    }
}


class PersonalizationModel {
    /** @type {Array<CustomValue>} */
    custom_values = [];

    constructor({ custom_values }) {
        if (custom_values === undefined || !Array.isArray(custom_values))
            throw new TypeError('Parameter "custom_values" has to be an array');

        this.custom_values = custom_values.map(e => new CustomValue(e));
    }
}

/** @returns {Promise<PersonalizationModel>} */
async function getUserPersonalization() {
    const response = await fetch(`${envs.DOMAIN_URL}/personalization/`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${getAccessToken()}`,
        }
    }).then(res => res.json())
      .catch(() => null);
    
    return new PersonalizationModel(response);
}

/**
 * 
 * @param {String} name 
 * @param {File | String} value 
 * @returns {Promise<null>}
 */
async function saveUserPersonalization(name, value) {
    let file_path_ending = '';

    const form = new FormData();
    form.append('name', name);

    if (value instanceof File) {
        form.append('field_type', 'file');
        form.append('media_type', value.media_type);
        form.append('file_name', value.name);

        file_path_ending += 'upload/'
    } else {
        form.append('field_type', 'primitive');
    }

    form.append('value', value)
    await fetch(`${envs.DOMAIN_URL}/personalization/${file_path_ending}`, {
        method: 'POST',
        body: form,
        headers: {
            'Authorization': `Bearer ${getAccessToken()}`,
        }
    }).then(res => res.json())
      .catch(() => null);
    
    return null;
}

/**
 * 
 * @param {CustomValue} costomField
 * @returns {Promise<Blob>}
 */
async function getFile(costomField) {
    const response = await fetch(`${envs.DOMAIN_URL}/personalization/${costomField.uid}/download/`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${getAccessToken()}`,
        }
    }).then(res => res.blob())
      .catch(() => null);
    
    return response;
}

export {
    CustomValueFieldType,
    CustomValue,
    PersonalizationModel,
    //
    getUserPersonalization,
    saveUserPersonalization,
    getFile,
}