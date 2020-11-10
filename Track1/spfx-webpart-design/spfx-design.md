# Diseñar Web Part

## Añadir modelo y origen de datos
Aunque en la realidad los datos los deberíamos obtener desde una fuente "externa" mediante una consulta a alguna Api, en este caso para simplificar dispondremos de la colección dentro del fichero en el que declaramos el modelo.
- Dentro de la carpeta *src/webparts* crear una subcarpeta llamada *model*
- Crear un fichero llamado ISaints.ts o descargarlo desde [este enlace]()
### En caso de haberlo creado
- añadir las siguientes interfaces

```javascript
export interface ISaintProps {
   id: number;
   name: string;
   picture: string;
   bio: string;
   strength: number;
   skills?: string;
   constellation: string;
   class: string;
}

export interface ISaint {
   saint: ISaintProps;
}

export interface ISaints {
   saints: ISaintProps[];
}
```
- Crear una colección de elementos siguiendo el ejemplo:

```javascript
export var saintsList: ISaints = 
{"saints": [
   {
       "id": 1, 
       "strength": 18,  
       "name": "Seiya",    
       "class": "Bronze",
       "picture": "https://saintseiya-cdn.gaming.ph/images/thumb/1/1f/Seiya-full.jpg/x256px-Seiya-full.jpg.pagespeed.ic.adsIjSa-7K.webp", 
       "skills": "Seiya, a powerful single damage dealer in the early stage, may become a support character in the later stage by putting enemies in a weakened state with his Pegasus Comet Fist, allowing other Saints to deal even higher damage.",
       "bio": "In order to maintain justice and protect Athena, he is willing to sacrifice everything and won't give up easily. His firm will and unyielding faith is contagious to everyone around him, and he is the spiritual leader of the Five Bronze Saints.",
       "constellation": "Pegasus"
   },
   { NEXT ELEMENTS }...
]}
```

## Añadir componentes para visualizar la lista de elementos
### Añadir componente de lista
- Crear subcarpeta *saint* dentro de la carpeta *components*
- Añadir fichero saintList.tsx con el contenido

```javascript
import * as React from 'react';
import styles from '../CoolWebPart.module.scss';
import { ISaintProps, ISaints, ISaint, saintsList } from '../../../model/ISaints';

interface IListProps {
   saints: ISaintProps[];
 }
 
export const SaintList =  (props: IListProps) => {
   return (
     <>
       <ul>
         <li key={-1}>
           <div></div>
           <div>Saint</div>
           <div>Constellation</div>
           <div>Class</div>
           <div>Strength</div>
           <div></div>
         </li>
 
         {props.saints.map((item, index) => {
           return (
            <li>{item.name}</li>
           );
         })}
       </ul>
     </>
   );
 };
 
```
- En el componente del webpart CoolWebPart.tsx, añadir el import del componente de lista:
```javascript
import { ISaintProps, ISaints, ISaint, saintsList } from '../../model/ISaints';
import { SaintList } from './saint/saintList';
```
- En el render de CoolWebPart.tsx, sustituir el contenido del return por:

```javascript
<>
      <SaintList  saints={saintsList.saints}/>
</>
```

### Añadir componente individual
- Crear fichero saint.tsx dentro de la misma carpeta anterior con el contenido

```javascript
import * as React from 'react';
import styles from '../CoolWebPart.module.scss';
import { ISaintProps, ISaints, ISaint, saintsList } from '../../../model/ISaints';
import { Rating, RatingSize, IRatingStyles } from 'office-ui-fabric-react/lib/Rating';

export const Saint = (props: ISaint, key: number) => {
   return (
     <>
       <li key={key}>
         <div>{props.saint.name}</div>
         <div>{props.saint.constellation !== '' ? props.saint.constellation : '-' }</div>
         <div>{props.saint.class}</div>
         <div><span className={styles.galleryOnly}>Strength: </span>{props.saint.strength}</div>
       </li>
     </>
   );
 };
```

- En el componente del listado, sustituir la línea: 

```javascript
<li>{item.name}</li>
```
- Por:

```javascript
<Saint saint={item} key={index} />
```

- Añadir el import del componente individual en la cabecera del componente de lista
import { Saint } from './saint';

### Añadir filtros y modo de vista
- Crear la subcarpeta *filters* dentro de *components*
- Crear el fichero filter.tsx con el siguiente contenido

```javascript
import * as React from 'react';
import styles from '../CoolWebPart.module.scss';
import { ISaintProps, ISaints, ISaint, saintsList } from '../../../model/ISaints';
import { Dropdown, DropdownMenuItemType, IDropdownStyles, IDropdownOption } from 'office-ui-fabric-react/lib/Dropdown';

interface IFilterProps {
   saints: ISaintProps[];
   handleFilter: (key:string) => any;
 }
 
 export const Filter = (props: IFilterProps) => {
   const options: IDropdownOption[] = [
     { key: 'All', text: 'All Saints' },
     { key: 'Bronze', text: 'Bronze' },
     { key: 'Silver', text: 'Silver' },
     { key: 'Gold', text: 'Gold' },
     { key: 'Legendary', text: 'Legendary' }
   ];
   const dropdownStyles: Partial<IDropdownStyles> = {
     dropdown: { width: 300 },
   };
 
   function onSelectClass (event: React.FormEvent<HTMLDivElement>, option?: IDropdownOption, index?: number) {
     if (option != null) {
       props.handleFilter(option.key.toString());
     }
   }
 
   return (
     <>
       <Dropdown
         placeholder="All Saints"
         defaultSelectedKeys={["All"]}
         label="Filter Saints"
         options={options}
         styles={dropdownStyles}
         onChange={onSelectClass} />
     </>
   );
 };
 
```
#### Dentro del componente CoolWebPart.tsx añadir lo siguiente:
- En la clase del componente añadir los siguientes métodos

```javascript
  constructor(props) {
    super(props);
    this.state = { 
      saintsFiltered: saintsList.saints, 
      styleViewMode: this.props.viewMode === 'GALLERY' ? styles.GALLERY : styles.LIST,
      viewMode: this.props.viewMode === 'GALLERY' ? styles.GALLERY : styles.LIST      
    };
    this.FilterSaints = this.FilterSaints.bind(this);
    this.setViewMode = this.setViewMode.bind(this);
  }

  public FilterSaints(key: string) {
    if (key === 'All') {
      this.setState(() => {  
        return { saintsFiltered: saintsList.saints };  
      });
    } else {
      this.setState(() => {  
        return { saintsFiltered: saintsList.saints.filter((saint) => { return saint.class === key;}) };  
      });
    }
  }

  private setViewMode(newViewMode: string) {
    this.setState({
      viewMode: newViewMode,
      styleViewMode: newViewMode === 'GALLERY' ? styles.GALLERY : styles.LIST
    });
  }
```

- En el render, cambiar la llamada al componente de lista por la siguiente línea, además del filtro

```javascript
   <Filter saints={this.state.saintsFiltered} handleFilter={this.FilterSaints} /> 
   <SaintList saints={this.state.saintsFiltered} viewMode={this.state.viewMode}/>
```

- Importar el nuevo componente de filtro
```javascript
import { Filter } from './filters/filter';
```

- Añadir la propiedad "modo de vista" a la interfaz del componente de lista
```javascript
interface IListProps {
  viewMode: string;
  saints: ISaintProps[];
}
```
## Añadir estilos

## Añadir propiedades de configuración en modo edición

## Añadir elementos de FluentUI
### Añadir rating
### Añadir barra de comandos

## ENLACES

[INDEX](./readme.md)

[0.- Development environment](./environment.md)

[1.- SPFx Webpart](./spfx-intro.md)

2.- SPFx Design