import _ from 'lodash'

export const softTransfomEntity = (obj) => {
	const result = { ...obj }

	if (_.isArray(obj.properties)) {
		result.properties = transformListToDict(obj.properties)
	}

	if (_.isArray(obj.relations)) {
		const relations = {}

		for (const relation of result.relations) {
			if (!relation.entities.length) {
				continue
			}

			relations[relation.symbolCode] = {
				entities: relation.entities.map(softTransfomEntity),
			}
		}

		result.relations = relations
	}

	return result
}

export const transformListToDict = (list) => {
	const result = {}
	for (const prop of list) {
		result[prop.symbolCode] = _.omit(prop, 'symbolCode')
	}
	return result
}
