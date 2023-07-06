export const menuResponse = {
    statusCode: 200,
    message: 'success',
    result: {
        data: [
            {
                _id: '63d91b704c2d1ceeb7572547',
                name: 'Page1',
                pageId: '63d91837f87f49390ae9e546',
                localName: '',
                description: '',
                authorization: [{res: '', scope: '', roles: 'test'}],
                localDescription: '',
                icon: ' accessibility',
                parentId: '',
                policies: [
                    {
                        name: 'Policy',
                        type: 'role',
                        logic: 'POSITIVE',
                        decisionStrategy: 'UNANIMOUS',
                        config: {
                            roles: [
                                {id: 't', required: false},
                                {id: 'e', required: false},
                                {id: 's', required: false},
                                {id: 't', required: false},
                            ],
                        },
                    },
                ],
                resources: [
                    {name: '', ownerManagedAccess: true, resourceScope: ['']},
                ],
                permissions: [
                    {
                        name: 'PermissionTo',
                        type: 'scope',
                        logic: 'POSITIVE',
                        decisionStrategy: 'UNANIMOUS',
                        config: {
                            resources: [''],
                            scopes: [''],
                            applyPolicies: ['Policy'],
                        },
                    },
                ],
                created_at: '2023-01-31T13:45:20.889Z',
                updated_at: '2023-01-31T13:45:40.423Z',
                __v: 0,
            },
            {
                _id: '63d91b734c2d1ceeb757254c',
                name: 'Page2',
                pageId: '63d918c6f87f49390ae9e550',
                localName: '',
                description: '',
                authorization: [{res: '', scope: '', roles: 'test'}],
                localDescription: '',
                icon: ' Accommodation',
                parentId: '',
                policies: [
                    {
                        name: 'Policy',
                        type: 'role',
                        logic: 'POSITIVE',
                        decisionStrategy: 'UNANIMOUS',
                        config: {
                            roles: [
                                {id: 't', required: false},
                                {id: 'e', required: false},
                                {id: 's', required: false},
                                {id: 't', required: false},
                            ],
                        },
                    },
                ],
                resources: [
                    {name: '', ownerManagedAccess: true, resourceScope: ['']},
                ],
                permissions: [
                    {
                        name: 'PermissionTo',
                        type: 'scope',
                        logic: 'POSITIVE',
                        decisionStrategy: 'UNANIMOUS',
                        config: {
                            resources: [''],
                            scopes: [''],
                            applyPolicies: ['Policy'],
                        },
                    },
                ],
                created_at: '2023-01-31T13:45:23.059Z',
                updated_at: '2023-01-31T13:45:48.718Z',
                __v: 0,
            },
            {
                _id: '63d91b784c2d1ceeb7572551',
                name: 'APPS',
                pageId: '',
                localName: '',
                description: '',
                authorization: [{res: '', scope: '', roles: 'test'}],
                localDescription: '',
                icon: ' attach_file',
                parentId: '',
                policies: [
                    {
                        name: 'Policy',
                        type: 'role',
                        logic: 'POSITIVE',
                        decisionStrategy: 'UNANIMOUS',
                        config: {
                            roles: [
                                {id: 't', required: false},
                                {id: 'e', required: false},
                                {id: 's', required: false},
                                {id: 't', required: false},
                            ],
                        },
                    },
                ],
                resources: [
                    {name: '', ownerManagedAccess: true, resourceScope: ['']},
                ],
                permissions: [
                    {
                        name: 'PermissionTo',
                        type: 'scope',
                        logic: 'POSITIVE',
                        decisionStrategy: 'UNANIMOUS',
                        config: {
                            resources: [''],
                            scopes: [''],
                            applyPolicies: ['Policy'],
                        },
                    },
                ],
                created_at: '2023-01-31T13:45:28.455Z',
                updated_at: '2023-01-31T13:45:56.920Z',
                __v: 0,
            },
            {
                _id: '63d91b7c4c2d1ceeb7572556',
                name: 'Page3',
                pageId: '63d91952f87f49390ae9e55e',
                localName: '',
                description: '',
                authorization: [{res: '', scope: '', roles: 'test'}],
                localDescription: '',
                icon: ' add_task_black_24dp',
                parentId: '63d91b784c2d1ceeb7572551',
                policies: [
                    {
                        name: 'Policy',
                        type: 'role',
                        logic: 'POSITIVE',
                        decisionStrategy: 'UNANIMOUS',
                        config: {
                            roles: [
                                {id: 't', required: false},
                                {id: 'e', required: false},
                                {id: 's', required: false},
                                {id: 't', required: false},
                            ],
                        },
                    },
                ],
                resources: [
                    {name: '', ownerManagedAccess: true, resourceScope: ['']},
                ],
                permissions: [
                    {
                        name: 'PermissionTo',
                        type: 'scope',
                        logic: 'POSITIVE',
                        decisionStrategy: 'UNANIMOUS',
                        config: {
                            resources: [''],
                            scopes: [''],
                            applyPolicies: ['Policy'],
                        },
                    },
                ],
                created_at: '2023-01-31T13:45:32.460Z',
                updated_at: '2023-01-31T13:46:05.928Z',
                __v: 0,
            },
        ],
        total: 4,
    },
};
