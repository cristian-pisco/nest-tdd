export interface IBaseRepository<T, Id, CreateDto, UpdateDto> {
    getById(id: Id): Promise<T>;
    create(item: CreateDto): Promise<T>;
    update(item: UpdateDto): Promise<T>;
}
