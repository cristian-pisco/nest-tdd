export interface IBaseRepository<T, Id, CreateDto, UpdateDto, DeleteDto> {
    getById(id: Id): Promise<T>;
    create(item: CreateDto): Promise<T>;
    update(item: UpdateDto): Promise<T>;
    delete(item: DeleteDto): Promise<T>;
}
